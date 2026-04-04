import { useEffect, useRef, useState } from "react";
import { ITodo } from "../interfaces/todo";
import Todo from "./Todo"
import styles from "./TodoList.module.css"
import AddTodo from "./AddTodo";

function TodoList() {
  const [todoIndex, setTodoIndex] = useState<number>(-1);
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);
  const [items, setItems] = useState<ITodo[]>([]);

  const addTodoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const data = await window.ipcRenderer.store.get('items') as ITodo[];
      setItems(data || []);
    };
    load();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'j') {
        if (!showAddTodo) {
          e.preventDefault();
          setTodoIndex(prev => prev < (items.length - 1) ? prev + 1 : (items.length - 1));
        }
        return;
      }

      if (e.key === 'k') {
        if (!showAddTodo) {
          e.preventDefault();
          setTodoIndex(prev => prev > 0 ? prev - 1 : 0);
        }
        return;
      }

      if (e.key === 'o') {
        if (!showAddTodo) {
          e.preventDefault();
          setShowAddTodo(true);
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (showAddTodo) {
          setShowAddTodo(false);
        }
      }

    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, showAddTodo]);

  useEffect(() => {
    if (showAddTodo) {
      addTodoInputRef.current?.focus();
    }
  }, [showAddTodo]);

  const handleAddTodo = (todo: ITodo) => {
    setItems(prev => {
      const newItems = [...prev, todo];
      window.ipcRenderer.store.set('items', newItems);
      setShowAddTodo(false);
      return newItems;
    })
  }

  return (
    <>
      <div className={styles.todoList}>
        {items.map((t, index) => (
          <Todo
            todo={t}
            index={index}
            isActive={index === todoIndex} />
        ))}

        {showAddTodo && <AddTodo inputRef={addTodoInputRef} onAdd={handleAddTodo} />}
      </div>
    </>
  )
}

export default TodoList;
