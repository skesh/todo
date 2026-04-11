import { useEffect } from 'react';
import TodoList from './components/TodoList';
import Toolbar from './components/Toolbar';
import { useTodoStore } from './store/todosStore';
import Footer from './components/Footer.tsx';

function App() {
  const initialize = useTodoStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <Toolbar />
      <TodoList />
      <Footer />
    </div>
  )
}

export default App
