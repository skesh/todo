import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import type { Todo } from '../interfaces/todo'
import { useUiActions } from './uiStore'

export interface TodoState {
  items: Todo[]
  activeId: string | null
  isFiltred: boolean
  initialized: boolean
  showDone: boolean
  initialize: () => Promise<void>
  setItems: (items: Todo[]) => void
  setActiveId: (index: string | null) => void
  addItem: (item: Todo) => void
  editItemById: (id: string, item: Todo) => void
  deleteActiveTodo: () => void
  toggleDone: (id: string) => void
  toggleFilter: () => void
  toggleShowDone: () => void
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  activeId: null,
  initialized: false,
  isFiltred: true,
  showDone: false,

  initialize: async () => {
    if (get().initialized) return
    set({ initialized: true })
    const items = (await window.ipcRenderer.store.get('items')) as Todo[]
    set({ items })
  },

  setItems: (items: Todo[]) => {
    set({ items })
    window.ipcRenderer.store.set('items', items)
  },

  addItem: (item: Todo) => {
    const { items, setItems } = get()
    setItems([...items, item])
  },

  editItemById: (id: string, item: Todo) => {
    const { items, setItems } = get()
    const newArr = [...items].map((i) => (i.id === id ? item : i))
    setItems(newArr)
  },

  setActiveId: (activeId: string | null) => set({ activeId }),

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
      showDone: s.showDone,
    })),
  )
