import { useEffect, useState } from "react";
import { ITodo } from "../interfaces/todo";
import styles from "./AddTodo.module.css";

interface AddTodoProps {
  onAdd: (todo: ITodo) => void;
  todo?: ITodo;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function AddTodo({ onAdd, inputRef, todo }: AddTodoProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title)
    }
  }, [todo])

  function handleAdd() {
    if (title.trim()) {
      onAdd({ title, done: false, created: new Date().toString() });
    }
  }

  return (
    <input
      className={styles.todoInput}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      ref={inputRef}
    />
  );
}
