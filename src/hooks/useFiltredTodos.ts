import { isAfter, parse, startOfDay } from 'date-fns'
import { useMemo } from 'react'
import type { Todo } from '@/interfaces/todo'
import { useTodoStore } from '@/store/todosStore'

export function useFiltredTodos() {
  const isFiltred = useTodoStore((s) => s.isFiltred)
  const items = useTodoStore((s) => s.items)

  return useMemo(() => {
    const result = isFiltred
      ? items.filter(
          (i: Todo) =>
            (!i.date ||
              !isAfter(startOfDay(parse(i.date, 'dd.MM.yyyy', new Date())), startOfDay(new Date()))) &&
            i.dependsOn.every((depId) => items.find((t) => t.id === depId)?.done),
        )
      : items
    return result.sort((a, b) => +b.priority - +a.priority)
  }, [isFiltred, items])
}
