import useGlobalKeybindings from '@/keybindings/global-keybindings'
import { useTodoSelectors } from '@/store/todosStore'
import TodoList from './Todo/TodoList'

function PageInbox() {
  const { todos } = useTodoSelectors()

  useGlobalKeybindings()

  const inboxTodos = () => todos.filter((t) => !t.done && !t.projectId)

  return <TodoList todos={inboxTodos()} />
}

export default PageInbox
