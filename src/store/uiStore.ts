import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

export interface UIState {
  sidebarOpen: boolean
  editProjectOpen: boolean
  activeIndex: number
  menuOpen: boolean
  toggleSidebar: () => void
  setEditProject: (state: boolean) => void
  setActiveIndex: (index: number) => void
  toggleMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  menuOpen: false,
  editProjectOpen: false,
  activeIndex: -1,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  setEditProject: (state: boolean) => set({ editProjectOpen: state }),
  setActiveIndex: (index: number) => set({ activeIndex: index }),
}))

export const useUiSeletors = () =>
  useUIStore(
    useShallow((s) => ({
      sidebarOpen: s.sidebarOpen,
      activeIndex: s.activeIndex,
      menuOpen: s.menuOpen,
    })),
  )

export const useUiActions = () =>
  useUIStore(
    useShallow((s) => ({
      toggleSidebar: s.toggleSidebar,
      setEditProject: s.setEditProject,
      setActiveIndex: s.setActiveIndex,
      toggleMenu: s.toggleMenu,
    })),
  )
