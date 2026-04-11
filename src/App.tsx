import { useEffect, useState } from 'react';
import Footer from './components/Footer.tsx';
import TodoList from './components/TodoList';
import Toolbar from './components/Toolbar';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar.tsx';
import { useTodoStore } from './store/todosStore';
import { AppSidebar } from './components/AppSidebar.tsx';
import { useProjectStore } from './store/projectsStore.ts';

function App() {
  const [open, setOpen] = useState(false)
  const initializeProjects = useProjectStore((s) => s.initialize)
  const initializeTodos = useTodoStore((s) => s.initialize)

  useEffect(() => {
    initializeTodos()
    initializeProjects()
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <SidebarProvider open={open}>
      <AppSidebar />
      <SidebarInset>
        {/* <div className="flex flex-col flex-1 overflow-hidden"> */}
        <Toolbar sidebarToogle={() => setOpen(!open)} />
        <div className="flex-1 overflow-y-auto">
          <TodoList />
        </div>
        <Footer />
        {/* </div> */}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
