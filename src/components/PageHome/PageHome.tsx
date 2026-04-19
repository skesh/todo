import { useFiltredTodos } from '@/hooks/useFiltredTodos'
import { useTodoSelectors } from '@/store/todosStore'
import TodoDrawer from '../Todo/TodoDrawer'
import TodoList from '../Todo/TodoList'
import Footer from './Footer'
import Toolbar from './Toolbar'

export default function PageHome() {
  const todos = useFiltredTodos() || []
  const { showDone } = useTodoSelectors()

  const homeTodos = showDone ? todos : todos.filter((t) => !t.done)

  return (
    <>
      <Toolbar />
      <div className="flex-1 overflow-y-auto">
        <TodoList todos={homeTodos} />
      </div>
      <Footer />
      <TodoDrawer />
    </>
  )
}
