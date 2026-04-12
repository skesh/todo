import { useFiltredTodos } from "@/hooks/useFiltredTodos";
import keybindings from "@/keybindings/keybindings";
import { useEffect, useRef, useState } from "react";
import { useTodoStore } from "../../store/todosStore";
import EditTodo from "./EditTodo";
import Todo from "./Todo";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";

function TodoList() {
  const [activeIndex, setIndex] = useState(-1);
  const setActiveId = useTodoStore((s) => s.setActiveId)

  const items = useFiltredTodos()
  const mode = useTodoStore((s) => s.mode);

  const listRef = useRef<HTMLDivElement>(null);

  keybindings(activeIndex, items.length, setIndex);

  useEffect(() => {
    if (activeIndex >= 0) {
      if (items[activeIndex]?.id) setActiveId(items[activeIndex]?.id)
    }
  }, [activeIndex, items])

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

  return (
    <div className='flex flex-1 flex-col gap-1 w-full px-2 overflow-auto' ref={listRef}>
      {items.length > 0 && items.map((t, index) => (
        <Todo
          todo={t}
          key={index}
          isActive={index === activeIndex} />
      ))}
    </div>
  )
}

export default TodoList;
