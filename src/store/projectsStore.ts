import { IProject } from "@/interfaces/project";
import { create } from "zustand";

interface ProjectsState {
  projects: IProject[];
  activeId: string | null;

  initialized: boolean,
  initialize: () => void,
  saveProjects: (projects: IProject[]) => void,
  addProject: (project: IProject) => void,
  setId: (id: string) => void,
  deleteProject: () => void,
}

export const useProjectStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeId: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    set({ initialized: true })
    const projects = await window.ipcRenderer.store.get('projects') as IProject[]
    set({ projects })
  },

  saveProjects: (projects: IProject[]) => {
    set({ projects })
    window.ipcRenderer.store.set('projects', projects)
  },

  addProject(project: IProject) {
    const { projects, saveProjects } = get()
    saveProjects([...projects, project])
  },

  deleteProject() {
    const { projects, activeId, saveProjects } = get()
    if (activeId) {
      saveProjects([...projects.filter(p => p.id !== activeId)])
    }
  },

  setId: (id: string) => set({ activeId: id })
}))

