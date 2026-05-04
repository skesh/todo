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
import { useUiActions, useUiSelectors } from '@/store/uiStore.ts'
import { Input } from './ui/input'

export function AppSidebar() {
  const { projects } = useProjectSelectors()
  const { addProject, setId } = useProjectActions()
  const { editProjectOpen } = useUiSelectors()
  const { setEditProject, toggleSidebar } = useUiActions()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const navigateToProject = (id: string) => {
    navigate(`/project/${id}`)
    toggleSidebar()
  }

  useSidebarKeybindings(activeIndex, setActiveIndex, navigateToProject)

  useEffect(() => {
    if (activeIndex) {
      setId(projects[activeIndex]?.id)
    }
  }, [activeIndex, projects])

  function submitProject() {
    if (name.trim()) {
      addProject({ id: nanoid(), name, description: '', todoIds: [] })
      setName('')
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
              {projects.map((item, index) => (
                <SidebarMenuItem
                  key={item.id}
                  onClick={() => navigateToProject(item.id)}
                  className={cn('px-4', 'text-[16px]', index === activeIndex && 'bg-[deeppink]', 'rounded-[4px]')}
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
