import { useEffect, useState } from 'react'
import './App.css'
import { ITodo } from './interfaces/todo'
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
  const [items, setItems] = useState<ITodo[]>([]);
  useEffect(() => {
    const load = async () => {
      const data = await window.ipcRenderer.store.get('items') as ITodo[];
      setItems(data || []);
    };
    load();
  }, []);

  // function addTodo(todo: ITodo) {
  //   const newItems = [...items, todo];
  //   setItems(newItems);
  //   window.ipcRenderer.store.set('items', newItems);
  // }

  return (
    <>
      <TodoList todos={items}></TodoList>
    </>
  )
}

export default App
