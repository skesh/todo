import { useTodoStore } from "@/store/todosStore";
import { useMemo } from "react";

export function useTags(): string[] {
  const items = useTodoStore((s) => s.items)

  return useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => i.tags?.forEach(t => set.add(t)))
    return [...set];
  }, [items])
}
