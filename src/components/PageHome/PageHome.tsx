import { isAfter, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import type { Todo } from 'src/interfaces/todo'
import { DATE_FORMAT } from '@/config/config'
import useGlobalKeybindings from '@/keybindings/global-keybindings'
import { useTodoSelectors } from '@/store/todosStore'
import TodoList from '../Todo/TodoList'

export default function PageHome() {
  const { todos, showDone } = useTodoSelectors()
  const [homeTodos, setHomeTodos] = useState<Todo[]>([])

  useGlobalKeybindings()

  useEffect(() => {
    setHomeTodos(
      todos
        .filter((t) => (showDone ? t : !t.done))
        .filter((t) => (t.date ? isAfter(new Date(), parse(t.date, DATE_FORMAT, new Date())) : t))
        .filter((t) => t.dependsOn.every((depId) => todos.find((t) => t.id === depId)?.done))
        .sort((a, b) => (Number(b.priority) - Number(a.priority)))
    )
  }, [todos, showDone])

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-col overflow-y-auto">
        <div className="flex flex-1 flex-col px-2 py-2">
          <TodoList todos={homeTodos} />
        </div>
      </div>
    </div>
  )
}
