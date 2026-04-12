import { IProject } from "@/interfaces/project";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface ProjectsState {
  projects: IProject[];
  activeId: string | null;

  initialized: boolean,
  initialize: () => void,
  saveProjects: (projects: IProject[]) => void,
  addProject: (project: IProject) => void,
  setId: (id: string) => void,
  deleteProject: () => void,
  editProject: (id: string, project: IProject) => void,
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

  editProject: (id: string, project: IProject) => {
    const { projects, saveProjects } = get()
    const newProjects = [...projects].map(p => p.id === id ? project : p)
    saveProjects(newProjects)
  },

  deleteProject() {
    const { projects, activeId, saveProjects } = get()
    if (activeId) {
      saveProjects([...projects.filter(p => p.id !== activeId)])
    }
  },

  setId: (id: string) => set({ activeId: id })
}))

export const useProjectSelectors = () =>
  useProjectStore(useShallow((s) => ({
    projects: s.projects,
    activeProjectId: s.activeId,
    activeProject: s.projects.find(p => p.id === s.activeId)
  })))

export const useProjectActions = () =>
  useProjectStore(useShallow((s) => ({
    saveProjects: s.saveProjects,
    addProject: s.addProject,
    editProject: s.editProject,
    deleteProject: s.deleteProject,
    setId: s.setId,
  })))
