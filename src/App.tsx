import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
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
      <TodoList />
    </>
  )
}

export default App
