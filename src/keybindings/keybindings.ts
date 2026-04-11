import { useEffect, useRef } from "react";
import { useTodoStore } from "../store/todosStore";
import { useUIStore } from "@/store/uiStore";

export default function keybindings(activeIndex: number, totalItems: number, setIndex: (id: number) => void) {
  const items = useTodoStore((s) => s.items);
  const deleteActiveTodo = useTodoStore((s) => s.deleteActiveTodo);

  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const mode = useTodoStore((s) => s.mode);
  const setMode = useTodoStore((s) => s.setMode);

  const lastKeyRef = useRef<string | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastTimeRef.current;

      if (e.key === 'j' && !sidebarOpen) {
        if (!mode) {
          setIndex(activeIndex < (totalItems - 1) ? activeIndex + 1 : 0);
        }
        return;
      }

      if (e.key === 'k' && !sidebarOpen) {
        if (!mode) {
          setIndex(activeIndex > 0 ? (activeIndex - 1) : items.length - 1);
        }
        return;
      }

      if (e.key === 'o' && !sidebarOpen) {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('add')
        }
        return;
      }

      if (e.key === 'i' && !sidebarOpen) {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('edit');
        }
        return;
      }

      if (e.key === 'd' && !sidebarOpen) {
        if (!mode) {
          deleteActiveTodo();
          if (activeIndex === (totalItems - 1)) setIndex(activeIndex - 1)
        }
        return
      }

      if (e.key === 'G' && !sidebarOpen) {
        if (!mode) setIndex(0)
        return
      }

      if (e.key === 'g' && lastKeyRef.current === 'g' && timeDiff < 300 && !sidebarOpen) {
        if (!mode) {
          setIndex(items.length - 1);
        }
        return
      }

      if (e.key === 'Escape' && !sidebarOpen) {
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
  }, [items, activeIndex, mode, sidebarOpen]);
}
