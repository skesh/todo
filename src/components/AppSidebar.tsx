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
import { useProjectStore } from "@/store/projectsStore"
import { useUIStore } from "@/store/uiStore.ts"
import { nanoid } from "nanoid"
import { useState } from "react"
import { Input } from "./ui/input"

export function AppSidebar() {
  const projects = useProjectStore((s) => s.projects)
  const editProjectOpen = useUIStore((s) => s.editProjectOpen)
  const setEditProject = useUIStore((s) => s.setEditProject)
  const addProject = useProjectStore((s) => s.addProject)
  const projectId = useProjectStore((s) => s.activeId)

  const [name, setName] = useState('')
  const [id, setId] = useState(nanoid())
  const [description, setDescription] = useState('')

  function submitProject() {
    if (!!name.trim()) {
      addProject({ id, name, description, todoIds: [] })
      setName('')
      setId(nanoid())
      setEditProject(false)
    }
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
                  key={item.name}
                  className={cn('px-4', 'text-[16px]', (item.id === projectId && 'bg-red-500'))}
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
