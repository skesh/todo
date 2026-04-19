import { useFiltredTodos } from '@/hooks/useFiltredTodos'
import { useTodoSelectors } from '@/store/todosStore'
import TodoList from '../Todo/TodoList'

export default function PageHome() {
  const todos = useFiltredTodos() || []
  const { showDone } = useTodoSelectors()

  const homeTodos = showDone ? todos : todos.filter((t) => !t.done)

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
