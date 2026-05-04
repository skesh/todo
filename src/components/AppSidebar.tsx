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

const STATIC_NAV = [
  { id: 'home', name: 'Home', route: '/' },
  { id: 'inbox', name: 'Inbox', route: '/inbox' },
]

export function AppSidebar() {
  const { projects } = useProjectSelectors()
  const { addProject, setId } = useProjectActions()
  const { editProjectOpen } = useUiSelectors()
  const { setEditProject, toggleSidebar } = useUiActions()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const navItems = [
    ...STATIC_NAV,
    ...projects.map((p) => ({ id: p.id, name: p.name, route: `/project/${p.id}` })),
  ]

  const onEnter = () => {
    const item = navItems[activeIndex]
    if (!item) return
    navigate(item.route)
    toggleSidebar()
  }

  useSidebarKeybindings(activeIndex, setActiveIndex, navItems.length, onEnter)

  useEffect(() => {
    const projectIndex = activeIndex - STATIC_NAV.length
    if (projectIndex >= 0 && projects[projectIndex]) {
      setId(projects[projectIndex].id)
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
          <SidebarMenu className="gap-1">
            {STATIC_NAV.map((item, i) => (
              <SidebarMenuItem
                key={item.id}
                onClick={() => { navigate(item.route); toggleSidebar() }}
                className={cn('px-4', 'text-[16px]', i === activeIndex && 'bg-[deeppink]', 'rounded-[4px]')}
              >
                {item.name}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {projects.map((item, i) => (
                <SidebarMenuItem
                  key={item.id}
                  onClick={() => { navigate(`/project/${item.id}`); toggleSidebar() }}
                  className={cn(
                    'px-4',
                    'text-[16px]',
                    i + STATIC_NAV.length === activeIndex && 'bg-[deeppink]',
                    'rounded-[4px]',
                  )}
                >
                  {item.name}
                </SidebarMenuItem>
              ))}

              {editProjectOpen && (
                <Input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitProject()}
                />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
