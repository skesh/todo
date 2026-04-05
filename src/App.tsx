import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/todosStore';

function App() {
  const initialize = useTodoStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <TodoList />
    </>
  )
}

export default App
