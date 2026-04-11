
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useProjectStore } from "@/store/projectsStore"

export function AppSidebar() {
  const projects = useProjectStore((s) => s.projects)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!!projects.length && projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {/* <SidebarMenuButton asChild isActive={item.isActive}> */}
                  {/*   <a href={item.url}>{item.title}</a> */}
                  {/* </SidebarMenuButton> */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
