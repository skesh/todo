import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CommandMenu } from './components/Menu.tsx'
import Footer from './components/PageHome/Footer.tsx'
import PageHome from './components/PageHome/PageHome.tsx'
import PageInbox from './components/PageInbox.tsx'
import PageProject from './components/PageProject/PageProject.tsx'
import TodoDrawer from './components/Todo/TodoDrawer.tsx'
import { useProjectStore } from './store/projectsStore.ts'
import { useTodoStore } from './store/todosStore'

function App() {
  const initializeProjects = useProjectStore((s) => s.initialize)
  const initializeTodos = useTodoStore((s) => s.initialize)

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
      <div className="flex min-h-screen flex-col">
        {/* <SidebarProvider open={sidebarOpen}> */}
        {/*   <AppSidebar /> */}
        {/*   <SidebarInset> */}
        <CommandMenu />
        {/* <Toolbar /> */}
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/inbox" element={<PageInbox />} />
          <Route path="/project/:id" element={<PageProject />} />
        </Routes>
        <div className="flex-1" />
        {/*   </SidebarInset> */}
        {/* </SidebarProvider> */}

        <Footer />
        <TodoDrawer />
      </div>
    </BrowserRouter>
  )
}

export default App
