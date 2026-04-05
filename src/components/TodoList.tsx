import { useEffect, useRef } from "react";
import { ITodo } from "../interfaces/todo";
import Todo from "./Todo"
import styles from "./TodoList.module.css"
import AddTodo from "./AddTodo";
import { useTodoStore } from "../store/todosStore";
import keybindings from "../keybindings/keybindings";

function TodoList() {
  const items = useTodoStore((s) => s.items);
  const activeIndex = useTodoStore((s) => s.activeIndex);
  const setIndex = useTodoStore((s) => s.setIndex);
  const setItems = useTodoStore((s) => s.setItems);
  const mode = useTodoStore((s) => s.mode);

  const addTodoInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  keybindings();

  useEffect(() => {
    if (mode) {
      addTodoInputRef.current?.focus();
    }
  }, [mode]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const container = listRef.current;
      const elements = container.querySelectorAll('[data-todo]');
      const target = elements[activeIndex] as HTMLElement;

      if (target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Если элемент вне видимой области - скроллим
        if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [activeIndex])

  const handleAddTodo = (todo: ITodo) => {
    if (mode) {
      if (mode === 'add') {
        setItems([...items, todo]);
      }
      if (mode === 'edit') {
        const newItems = [...items.map((i, index) => index === activeIndex ? todo : i)];
        setItems(newItems);
        setIndex(newItems.findIndex(i => i.created === todo.created));
      }
    }
  }

  return (
    <>
      <span>{mode}</span>
      <div className={styles.todoList} ref={listRef}>

        {items.length > 0 && items.map((t, index) => (
          <Todo
            todo={t}
            key={index}
            isActive={index === activeIndex} />
        ))}

        {mode && <AddTodo inputRef={addTodoInputRef}
          onAdd={handleAddTodo}
          todo={items[activeIndex]}
          mode={mode}
        />}
      </div>
    </>
  )
}

export default TodoList;
