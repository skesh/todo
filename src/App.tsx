import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Toolbar from './components/Toolbar';
import { useTodoStore } from './store/todosStore';

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
    <>
      <div className='flex-col flex-1'>
        <Toolbar />
        <TodoList />
      </div>
    </>
  )
}

export default App
