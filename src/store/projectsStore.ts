import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import type { Project } from '@/interfaces/project'

interface ProjectsState {
  projects: Project[]
  activeId: string | null

  initialized: boolean
  initialize: () => void
  saveProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  setId: (id: string) => void
  deleteProject: () => void
  editProject: (id: string, project: Project) => void
}

export const useProjectStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeId: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return
    set({ initialized: true })
    const projects = (await window.ipcRenderer.store.get('projects')) as Project[]
    set({ projects })
  },

  saveProjects: (projects: Project[]) => {
    set({ projects })
    window.ipcRenderer.store.set('projects', projects)
  },

  addProject(project: Project) {
    const { projects, saveProjects } = get()
    saveProjects([...projects, project])
  },

  editProject: (id: string, project: Project) => {
    const { projects, saveProjects } = get()
    const newProjects = [...projects].map((p) => (p.id === id ? project : p))
    saveProjects(newProjects)
  },

  deleteProject() {
    const { projects, activeId, saveProjects } = get()
    if (activeId) {
      saveProjects([...projects.filter((p) => p.id !== activeId)])
    }
  },

  setId: (id: string) => set({ activeId: id }),
}))

export const useProjectSelectors = () =>
  useProjectStore(
    useShallow((s) => ({
      projects: s.projects,
      activeProjectId: s.activeId,
      activeProject: s.projects.find((p) => p.id === s.activeId),
    })),
  )

export const useProjectActions = () =>
  useProjectStore(
    useShallow((s) => ({
      saveProjects: s.saveProjects,
      addProject: s.addProject,
      editProject: s.editProject,
      deleteProject: s.deleteProject,
      setId: s.setId,
    })),
  )
