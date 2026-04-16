import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useSidebarKeybindings } from '@/keybindings/sidebar-keybinding'
import { cn } from '@/lib/utils'
import { useProjectActions, useProjectSelectors } from '@/store/projectsStore'
import { useUIStore } from '@/store/uiStore.ts'
import { Input } from './ui/input'

export function AppSidebar() {
  const { projects, activeProjectId } = useProjectSelectors()
  const { addProject } = useProjectActions()
  const editProjectOpen = useUIStore((s) => s.editProjectOpen)
  const setEditProject = useUIStore((s) => s.setEditProject)

  const [name, setName] = useState('')

  const navigate = useNavigate()

  useSidebarKeybindings()

  const navigateToProject = (projectId: string) => {
    navigate(`/project/${projectId}`)
  }

  function submitProject() {
    if (name.trim()) {
      addProject({ id: nanoid(), name, description: '', todoIds: [] })
      setName('')
      setEditProject(false)
    }
  }

  useEffect(() => {
    if (activeProjectId) {
      navigate(`/project/${activeProjectId}`)
    }
  }, [activeProjectId, navigate])

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
                  className={cn('px-4', 'text-[16px]', item.id === activeProjectId && 'bg-red-500')}
                >
                  {item.name}
                </SidebarMenuItem>
              ))}

              {/* TODO: вынести в компонент */}
              {editProjectOpen && (
                <Input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitProject()}
                ></Input>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
