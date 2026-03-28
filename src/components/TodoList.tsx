import { useEffect, useRef, useState } from "react";
import { ITodo } from "../interfaces/todo";
import Todo from "./Todo"
import styles from "./TodoList.module.css"

function TodoList() {
  const [todoIndex, setTodoIndex] = useState<number>(-1);
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);
  const [items, setItems] = useState<ITodo[]>([]);
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
        setIsEditable(true);
      }
    });
  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'j') {
        e.preventDefault();
        setTodoIndex(prev => {
          return prev < (items.length - 1) ? prev + 1 : (items.length - 1)
        });
        return;
      }
      if (e.key === 'k') {
        e.preventDefault();
        setTodoIndex(prev => prev > 0 ? prev - 1 : 0);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items]);

  return (
    <>
      <div className={styles.todoList}>
        {items.map((t, index) => (
          <Todo
            todo={t}
            index={index}
            isActive={index === todoIndex} />
        ))}
      </div>
    </>
  )
}

export default TodoList;
