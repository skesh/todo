import { useEffect, useRef, useState } from "react";
import { ITodo } from "../interfaces/todo";
import Todo from "./Todo"
import styles from "./TodoList.module.css"
import AddTodo from "./AddTodo";

function TodoList() {
  const [todoIndex, setTodoIndex] = useState<number>(-1);
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);
  const [items, setItems] = useState<ITodo[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  const addTodoInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const data = await window.ipcRenderer.store.get('items') as ITodo[];
      setItems(data || []);
    };
    load();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

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

      if (e.key === 'e') {
        if (!showAddTodo && !editMode) {
          e.preventDefault();
          setShowAddTodo(true);
          setEditMode(true);
        }
        return;
      }

      if (e.key === 'd') {
        if (!showAddTodo && !editMode) {
          e.preventDefault();
          handleDelete();
        }
        return
      }

      if (e.key === 'G') {
        if (!showAddTodo && !editMode) {
          e.preventDefault();
          setTodoIndex(0);
        }
        return
      }

      if (e.key === 'g' && lastKeyRef.current === 'g' && timeDiff < 300) {
        if (!showAddTodo && !editMode) {
          e.preventDefault();
          setTodoIndex(items.length - 1);
        }
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleEscape();
        return;
      }

      lastKeyRef.current = e.key;
      lastTimeRef.current = now;
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, showAddTodo, todoIndex]);

  useEffect(() => {
    if (showAddTodo) {
      addTodoInputRef.current?.focus();
    }
  }, [showAddTodo]);

  useEffect(() => {
    if (todoIndex >= 0 && listRef.current) {
      const container = listRef.current;
      const elements = container.querySelectorAll('[data-todo]');
      const target = elements[todoIndex] as HTMLElement;

      if (target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Если элемент вне видимой области - скроллим
        if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [todoIndex])

  const handleEscape = () => {
    if (showAddTodo) setShowAddTodo(false);
    if (editMode) setEditMode(false);
  }

  const handleAddTodo = (todo: ITodo) => {
    const newItems = editMode
      ? [...items.map((i, index) => index === todoIndex ? todo : i)]
      : [...items, todo]
    handleEscape();
    saveItems(newItems);
    const newIndex = newItems.findIndex(i => i.created === todo.created);
    setTodoIndex(newIndex);
  }

  const handleDelete = () => {
    const newItems = items.filter((_, index) => index !== todoIndex);
    if (todoIndex === newItems.length) setTodoIndex(todoIndex - 1);
    saveItems(newItems);
  }

  const saveItems = (items: ITodo[]) => {
    setItems(items);
    window.ipcRenderer.store.set('items', items);
  }

  return (
    <>
      <div className={styles.todoList} ref={listRef}>
        {items.map((t, index) => (
          <Todo
            todo={t}
            key={index}
            isActive={index === todoIndex} />
        ))}

        {showAddTodo && <AddTodo inputRef={addTodoInputRef}
          onAdd={handleAddTodo}
          todo={editMode ? items[todoIndex] : undefined} />}
      </div>
    </>
  )
}

export default TodoList;
