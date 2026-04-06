import { useEffect, useRef, useState } from "react";
import { ITodo } from "../interfaces/todo";
import styles from "./AddTodo.module.css";

interface AddTodoProps {
  onAdd: (todo: ITodo) => void;
  todo?: ITodo;
  mode: 'add' | 'edit' | false;
}

export default function AddTodo({ onAdd, todo, mode }: AddTodoProps) {
  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    inputRef.current?.focus()
    if (todo && mode === 'edit') {
      setTitle(todo.title)
    }
  }, [todo, mode])

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
