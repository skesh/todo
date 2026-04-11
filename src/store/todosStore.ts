import { create } from "zustand";
import { ITodo } from "../interfaces/todo";

export interface TodoState {
  items: ITodo[],
  activeId: string | null,
  mode: 'add' | 'edit' | false,
  isFiltred: boolean,
  initialized: boolean,
  initialize: () => Promise<void>,
  setItems: (items: ITodo[]) => void,
  setActiveId: (index: string | null) => void,
  addItem: (item: ITodo) => void,
  editItemById: (id: string, item: ITodo) => void,
  deleteActiveTodo: () => void,
  setMode: (mode: 'add' | 'edit' | false) => void,
  toogleFilter: () => void,
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  activeId: null,
  initialized: false,
  mode: false,
  isFiltred: true,

  initialize: async () => {
    if (get().initialized) return;
    set({ initialized: true })
    const items = await window.ipcRenderer.store.get('items') as ITodo[]
    set({ items })
  },

  setItems: (items: ITodo[]) => {
    set({ items, mode: false })
    window.ipcRenderer.store.set('items', items);
  },

  addItem: (item: ITodo) => {
    const { items, setItems } = get()
    setItems([...items, item])
  },

  editItemById: (id: string, item: ITodo) => {
    const { items, setItems } = get()

    const newArr = [...items].map(i => i.id === id ? item : i)
    setItems(newArr)
  },

  setActiveId: (activeId: string | null) => {
    set({ activeId })
  },

  setMode: (mode) => {
    set({ mode })
  },

  deleteActiveTodo: () => {
    const { activeId, items, setItems } = get();
    setItems(items.filter((item) => item.id !== activeId))
  },

  toogleFilter: () => {
    const { isFiltred } = get()
    set({ isFiltred: !isFiltred })
  }
})
)
