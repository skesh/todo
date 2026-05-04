import { useEffect, useRef } from 'react'
import type { Todo } from '@/interfaces/todo'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import TodoCard from './TodoCard'
import { useTodoListKeybindings } from './TodoList.keybind'

export default function TodoList({ todos }: { todos: Todo[] }) {
  const { activeTodo } = useTodoSelectors()
  const { setActiveId } = useTodoActions()

  const activeIndex = activeTodo ? todos.findIndex((todo) => todo.id === activeTodo.id) : -1
  const listRef = useRef<HTMLDivElement>(null)

  useTodoListKeybindings(todos, activeIndex)

  useEffect(() => {
    if (todos.length === 0) {
      setActiveId(null)
      return
    }
    if (!activeTodo || activeIndex === -1) {
      setActiveId(todos[0].id)
    }

  }, [todos, activeTodo, activeIndex, setActiveId])

  useEffect(() => {
    if (!activeTodo?.id) return
    const activeElement = listRef.current?.querySelector(`[data-id="${activeTodo.id}"]`)
    if (activeElement instanceof HTMLElement) {
      activeElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [activeTodo?.id, todos.length])

  return (
    <div ref={listRef} className="flex flex-1 flex-col gap-1 w-full overflow-auto">
      {todos.map((t, i) => (
        <TodoCard todo={t} isActive={i === activeIndex} key={t.id} />
      ))}
    </div>
  )
}
