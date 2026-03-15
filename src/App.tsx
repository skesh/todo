import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './interfaces/todo'

function App() {
  const [items, setItems] = useState<Todo[]>([]);
  useEffect(() => {
    const load = async () => {
      const data = await window.ipcRenderer.store.get('items') as Todo[];
      setItems(data || []);
    };
    load();
  }, []);

  function addTodo(todo: Todo) {
    const newItems = [...items, todo];
    setItems(newItems);
    window.ipcRenderer.store.set('items', newItems);
  }

  return (
    <>
      {items.length}

      <div className="card">
        <button onClick={() => addTodo({ title: 'new', done: false, created: null })}>
          add todo
        </button>
      </div>

      {items.map(i => (
        <div>{i.title} {i.done ? '-' : '+'}</div>
      ))}
    </>
  )
}

export default App
