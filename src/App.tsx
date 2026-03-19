import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ITodo } from './interfaces/todo'
import TodoList from './components/TodoList';

function App() {
  const [items, setItems] = useState<ITodo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const data = await window.ipcRenderer.store.get('items') as ITodo[];
      setItems(data || []);
    };
    load();
  }, []);

  useEffect(() => {
    window.ipcRenderer.on('shortcut:new-todo', () => {
      if (!isEditable) {
        inputRef.current?.focus();
        console.log(isEditable);
        setIsEditable(true);
        console.log(isEditable);
        console.log('focus');
      }
    });
  }, []);

  function addTodo(todo: ITodo) {
    const newItems = [...items, todo];
    setItems(newItems);
    window.ipcRenderer.store.set('items', newItems);
  }

  function handleSubmit() {
    if (todoTitle) {
      addTodo({ title: todoTitle, done: false, created: new Date() });
      setTodoTitle('')
      inputRef.current?.blur();
    }
  }

  function dropFocus() {
    inputRef.current?.blur();
  }

  return (
    <>
      <div className="bodyList">
        <input className="todoInput" value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit() } else if (e.key === 'Escape') dropFocus() }}
          ref={inputRef} />
        <TodoList todos={items}></TodoList>
      </div>
    </>
  )
}

export default App
