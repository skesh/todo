import { ITodo } from "@/interfaces/todo";
import { useTodoStore } from "@/store/todosStore";
import { isBefore, parse } from "date-fns";
import { useMemo } from "react";

export function useFiltredTodos() {
  const isFiltred = useTodoStore(s => s.isFiltred)
  const items = useTodoStore(s => s.items)

  return useMemo(() => !!isFiltred
    ? items.filter((i: ITodo) => !i.date || (!!i.date && isBefore(parse(i.date, 'dd.MM.yyyy', new Date()), new Date())))
    : items, [isFiltred, items])
}
