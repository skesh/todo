import { create } from "zustand";
import { ITodo } from "../interfaces/todo";

export interface TodoState {
  items: ITodo[],
  activeIndex: number,
  mode: 'add' | 'edit' | false,
  isFiltred: boolean,
  initialized: boolean,
  initialize: () => Promise<void>,
  setItems: (items: ITodo[]) => void,
  setIndex: (index: number) => void,
  deleteActiveTodo: () => void,
  setMode: (mode: 'add' | 'edit' | false) => void,
  toogleFilter: () => void,
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  activeIndex: -1,
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

  setIndex: (activeIndex: number) => {
    set({ activeIndex })
  },

  setMode: (mode) => {
    set({ mode })
  },

  deleteActiveTodo: () => {
    const { activeIndex, items } = get();
    const newItems = items.filter((_, index) => index !== activeIndex);
    if (activeIndex === newItems.length) {
      set({ activeIndex: activeIndex - 1 });
    }
    set({ items: newItems })
  },

  toogleFilter: () => {
    const { isFiltred } = get()
    set({ isFiltred: !isFiltred })
  }
})
)
