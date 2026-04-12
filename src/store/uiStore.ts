import { create } from "zustand";

export interface UIState {
  sidebarOpen: boolean;
  setSidebar: (open: boolean) => void;
  toggleSidebar: () => void;
  editProjectOpen: boolean;
  setEditProject: (state: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  setSidebar: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  editProjectOpen: false,
  setEditProject: (state: boolean) => set({ editProjectOpen: state }),
  activeIndex: 0,
  setActiveIndex: (index: number) => set({ activeIndex: index })
}));
