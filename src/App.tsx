import { useEffect } from 'react';
import { AppSidebar } from './components/AppSidebar.tsx';
import Footer from './components/Footer.tsx';
import TodoList from './components/TodoList';
import Toolbar from './components/Toolbar';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar.tsx';
import { useSidebarKeybindings } from './keybindings/sidebar-keybinding.ts';
import { useProjectStore } from './store/projectsStore.ts';
import { useTodoStore } from './store/todosStore';
import { useUIStore } from './store/uiStore.ts';

function App() {
  const initializeProjects = useProjectStore((s) => s.initialize)
  const initializeTodos = useTodoStore((s) => s.initialize)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  useSidebarKeybindings()

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
    <SidebarProvider open={sidebarOpen}>
      <AppSidebar />
      <SidebarInset>
        <Toolbar />
        <div className="flex-1 overflow-y-auto">
          <TodoList />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
