import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useProjectActions, useProjectStore } from "@/store/projectsStore"
import { useUIStore } from "@/store/uiStore.ts"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { useNavigate } from "react-router"
import { useSidebarKeybindings } from "@/keybindings/sidebar-keybinding"

export function AppSidebar() {
  const projects = useProjectStore((s) => s.projects)
  const { addProject } = useProjectActions()
  const editProjectOpen = useUIStore((s) => s.editProjectOpen)
  const setEditProject = useUIStore((s) => s.setEditProject)
  const activeProjectId = useProjectStore((s) => s.activeId)

  const [name, setName] = useState('')

  const navigate = useNavigate();

  useSidebarKeybindings()

  function submitProject() {
    if (!!name.trim()) {
      addProject({ id: nanoid(), name, description: '', todoIds: [] })
      setName('')
      setEditProject(false)
    }
  }

  useEffect(() => {
    if (activeProjectId) {
      navigateToProject(activeProjectId);
    }
  }, [activeProjectId])

  const navigateToProject = (projectId: string) => {
    navigate(`/project/${projectId}`)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {projects.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  onClick={() => navigateToProject(item.id)}
                  className={cn('px-4', 'text-[16px]', (item.id === activeProjectId && 'bg-red-500'))}
                >{item.name}</SidebarMenuItem>
              ))}
              {/* TODO: вынести в компонент */}
              {editProjectOpen && <Input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitProject()}
              ></Input>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
