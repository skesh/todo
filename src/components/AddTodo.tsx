import { useState } from "react";
import { ITodo } from "../interfaces/todo";

interface AddTodoProps {
  onAdd: (todo: ITodo) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function AddTodo({ onAdd, inputRef }: AddTodoProps) {
  const [title, setTitle] = useState('');

  function handleAdd() {
    if (title.trim()) {
      onAdd({ title, done: false, created: new Date() });
      // setTitle('');
    }
  }

  return (
    <input
      className="todoInput"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      ref={inputRef}
    />
  );
}
