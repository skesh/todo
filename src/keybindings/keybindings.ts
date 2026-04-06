import { useEffect, useRef } from "react";
import { useTodoStore } from "../store/todosStore";

export default function keybindings() {
  const items = useTodoStore((s) => s.items);
  const activeIndex = useTodoStore((s) => s.activeIndex);
  const mode = useTodoStore((s) => s.mode);

  const setIndex = useTodoStore((s) => s.setIndex);
  const deleteActiveTodo = useTodoStore((s) => s.deleteActiveTodo);
  const setMode = useTodoStore((s) => s.setMode);

  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

      if (e.key === 'j') {
        if (!mode) {
          setIndex((activeIndex < (items.length - 1)) ? activeIndex + 1 : 0);
        }
        return;
      }

      if (e.key === 'k') {
        if (!mode) {
          setIndex(activeIndex > 0 ? (activeIndex - 1) : items.length - 1);
        }
        return;
      }

      if (e.key === 'o') {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('add')
        }
        return;
      }

      if (e.key === 'i') {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('edit');
        }
        return;
      }

      if (e.key === 'd') {
        if (!mode) {
          deleteActiveTodo();
        }
        return
      }

      if (e.key === 'G') {
        if (!mode) {
          setIndex(0);
        }
        return
      }

      if (e.key === 'g' && lastKeyRef.current === 'g' && timeDiff < 300) {
        if (!mode) {
          setIndex(items.length - 1);
        }
        return
      }

      if (e.key === 'Escape') {
        if (mode) {
          e.preventDefault();
          setMode(false);
        }
        return;
      }

      lastKeyRef.current = e.key;
      lastTimeRef.current = now;
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, activeIndex, mode]);
}
