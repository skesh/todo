import { useEffect } from 'react'
import { useHotkeys } from '@/hooks/useHotkeys'
import type { Todo } from '@/interfaces/todo'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import TodoCard from './TodoCard'

export default function TodoList({ todos }: { todos: Todo[] }) {
  const { activeTodo } = useTodoSelectors()
  const { setActiveId, setMode, deleteActiveTodo, toggleDone, toggleShowDone } = useTodoActions()
  const activeIndex = activeTodo ? todos.findIndex((todo) => todo.id === activeTodo.id) : -1
  const { mode } = useTodoSelectors()

  useEffect(() => {
    if (todos.length === 0) {
      setActiveId(null)
      return
    }
    if (!activeTodo || activeIndex === -1) {
      setActiveId(todos[0].id)
    }
  }, [todos, activeTodo, activeIndex, setActiveId])

  useHotkeys(
    window,
    'KeyJ',
    () => {
      if (todos.length === 0 || mode) return
      const next = activeIndex < todos.length - 1 && activeIndex !== -1 ? activeIndex + 1 : 0
      setActiveId(todos[next].id)
    },
    [activeIndex, todos, setActiveId],
  )
  useHotkeys(
    window,
    'KeyK',
    () => {
      if (todos.length === 0 || mode) return
      const next = activeIndex > 0 ? activeIndex - 1 : todos.length - 1
      setActiveId(todos[next].id)
    },
    [activeIndex, todos, setActiveId],
  )
  useHotkeys(window, 'KeyI', () => !mode && setMode('edit'))
  useHotkeys(window, 'G', () => !mode && setActiveId(todos[0].id), [todos])
  // useHotkeys('g g', () => setIndex(0), { scopes: ['list'] }, [todos.length])
  useHotkeys(window, 'D', () => deleteActiveTodo())
  useHotkeys(window, 'd', () => activeTodo && toggleDone(activeTodo.id))
  useHotkeys(window, 'KeyS', () => toggleShowDone())

  return (
    <div className="flex flex-1 flex-col gap-1 w-full overflow-auto">
      {todos.map((t, i) => (
        <TodoCard todo={t} isActive={i === activeIndex} key={t.id} />
      ))}
    </div>
  )
}
