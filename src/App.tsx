import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AppSidebar } from './components/AppSidebar.tsx'
import { CommandMenu } from './components/Menu.tsx'
import PageHome from './components/PageHome/PageHome.tsx'
import PageProject from './components/PageProject/PageProject.tsx'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar.tsx'
import { useProjectStore } from './store/projectsStore.ts'
import { useTodoStore } from './store/todosStore'
import { useUiSeletors } from './store/uiStore.ts'

function App() {
  const initializeProjects = useProjectStore((s) => s.initialize)
  const initializeTodos = useTodoStore((s) => s.initialize)
  const { sidebarOpen } = useUiSeletors()

  useEffect(() => {
    initializeTodos()
    initializeProjects()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <SidebarProvider open={sidebarOpen}>
        <AppSidebar />
        <SidebarInset>
          <CommandMenu />
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/project/:id" element={<PageProject />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
