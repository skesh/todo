import { useTodoSelectors } from '@/store/todosStore'
import TodoList from './Todo/TodoList'

function PageInbox() {
  const { todos } = useTodoSelectors()

  const inboxTodos = () => todos.filter((t) => !t.done && !t.projectId)

  return <TodoList todos={inboxTodos()} />
}

export default PageInbox
