import { useState } from "react";
import { ITodo } from "../interfaces/todo";

function AddTodo({ onAdd }: { onAdd: () => void }) {
  const [todoTitle, setTodoTitle] = useState<string>('');

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
      <input className="todoInput" value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit() } else if (e.key === 'Escape') dropFocus() }}
        ref={inputRef} />
    </>
  )
}

export default AddTodo
