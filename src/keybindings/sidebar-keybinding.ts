import { useProjectStore } from "@/store/projectsStore";
import { useUIStore } from "@/store/uiStore";
import { useEffect, useRef } from "react";

export function useSidebarKeybindings() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const setEditProject = useUIStore((s) => s.setEditProject)
  const editProjectOpen = useUIStore((s) => s.editProjectOpen)

  const projects = useProjectStore((s) => s.projects)
  const activeIndex = useUIStore((s) => s.activeIndex)
  const setActiveIndex = useUIStore((s) => s.setActiveIndex)

  const setProjectId = useProjectStore((s) => s.setId)
  const deleteProject = useProjectStore((s) => s.deleteProject)

  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

      if (e.key === 'j' && sidebarOpen && !editProjectOpen) {
        if (activeIndex < projects.length - 1) {
          setActiveIndex(activeIndex + 1)
          setProjectId(projects[activeIndex + 1]?.id)
        } else {
          setActiveIndex(0)
          setProjectId(projects[0]?.id)
        }
        return
      }

      if (e.key === 'k' && sidebarOpen && !editProjectOpen) {
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
          setProjectId(projects[activeIndex - 1]?.id)
        } else {
          setActiveIndex((projects.length - 1))
          setProjectId(projects[(projects.length - 1)]?.id)
        }
        return
      }

      if (e.key === 'd' && sidebarOpen && !editProjectOpen) {
        deleteProject()
        return
      }

      if (e.key === 'f' && lastKeyRef.current === ',' && timeDiff < 300 && !editProjectOpen) {
        toggleSidebar()
        return
      }

      if (e.key === 'o' && sidebarOpen && !editProjectOpen) {
        e.stopPropagation()
        e.preventDefault()
        setEditProject(true)
        return
      }

      if (e.key === 'Escape' && sidebarOpen) {
        e.stopPropagation()
        e.preventDefault()
        if (editProjectOpen) {
          setEditProject(false)
        }
        return
      }

      lastKeyRef.current = e.key;
      lastTimeRef.current = now;
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, editProjectOpen, activeIndex, projects])
}
