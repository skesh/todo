import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import type { ITodo } from '../interfaces/todo'

export interface TodoState {
  items: ITodo[]
  activeId: string | null
  mode: 'add' | 'edit' | false
  isFiltred: boolean
  initialized: boolean
  showDone: boolean
  initialize: () => Promise<void>
  setItems: (items: ITodo[]) => void
  setActiveId: (index: string | null) => void
  addItem: (item: ITodo) => void
  editItemById: (id: string, item: ITodo) => void
  deleteActiveTodo: () => void
  setMode: (mode: 'add' | 'edit' | false) => void
  toggleDone: (id: string) => void
  toggleFilter: () => void
  toggleShowDone: () => void
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  activeId: null,
  initialized: false,
  mode: false,
  isFiltred: true,
  showDone: false,

  initialize: async () => {
    if (get().initialized) return
    set({ initialized: true })
    const items = (await window.ipcRenderer.store.get('items')) as ITodo[]
    set({ items })
  },

  setItems: (items: ITodo[]) => {
    set({ items, mode: false })
    window.ipcRenderer.store.set('items', items)
  },

  addItem: (item: ITodo) => {
    const { items, setItems } = get()
    setItems([...items, item])
  },

  editItemById: (id: string, item: ITodo) => {
    const { items, setItems } = get()
    const newArr = [...items].map((i) => (i.id === id ? item : i))
    setItems(newArr)
  },

  setActiveId: (activeId: string | null) => set({ activeId }),
  setMode: (mode) => set({ mode }),

  deleteActiveTodo: () => {
    const { activeId, items, setItems } = get()
    setItems(items.filter((item) => item.id !== activeId))
  },

  toggleDone: (id: string) => {
    const { editItemById, items } = get()
    const todo = items.find((i) => i.id === id)
    if (todo) {
      editItemById(id, {
        ...todo,
        done: !todo.done,
        doneDate: todo.done ? '' : new Date().toString(),
      })
    }
  },

  toggleShowDone: () => set((state) => ({ showDone: !state.showDone })),
  toggleFilter: () => set((state) => ({ isFiltred: !state.isFiltred })),
}))

export const useTodoActions = () =>
  useTodoStore(
    useShallow((s) => ({
      setItems: s.setItems,
      addItem: s.addItem,
      editItemById: s.editItemById,
      setActiveId: s.setActiveId,
      setMode: s.setMode,
      deleteActiveTodo: s.deleteActiveTodo,
      toggleFilter: s.toggleFilter,
      toggleDone: s.toggleDone,
      toggleShowDone: s.toggleShowDone,
    })),
  )

export const useTodoSelectors = () =>
  useTodoStore(
    useShallow((s) => ({
      todos: s.items,
      activeTodo: s.items.find((i) => i.id === s.activeId),
      mode: s.mode,
      showDone: s.showDone,
    })),
  )
