import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import keybindings from './keybindings/keybindings';
import { useTodoStore } from './store/todosStore';
import Toolbar from './components/Toolbar';

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

  keybindings();

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
