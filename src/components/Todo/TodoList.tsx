import { useEffect, useRef } from 'react'
import { useHotkeys } from '@/hooks/useHotkeys'
import type { Todo } from '@/interfaces/todo'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import { useUiSeletors } from '@/store/uiStore'
import TodoCard from './TodoCard'

export default function TodoList({ todos }: { todos: Todo[] }) {
  const { activeTodo } = useTodoSelectors()
  const { setActiveId, setMode, deleteActiveTodo, toggleDone, toggleShowDone } = useTodoActions()
  const activeIndex = activeTodo ? todos.findIndex((todo) => todo.id === activeTodo.id) : -1
  const { mode } = useTodoSelectors()
  const { menuOpen, editMode } = useUiSeletors()
  const listRef = useRef<HTMLDivElement>(null)
  const lastKeyJPressAtRef = useRef(0)

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

  useHotkeys(
    window,
    'KeyJ',
    () => {
      if (todos.length === 0) return
      const now = Date.now()
      if (now - lastKeyJPressAtRef.current < 100) return
      lastKeyJPressAtRef.current = now
      const next = activeIndex < todos.length - 1 && activeIndex !== -1 ? activeIndex + 1 : 0
      setActiveId(todos[next].id)
    },
    [activeIndex, todos, setActiveId, mode, menuOpen, editMode],
    { enabled: !mode && !menuOpen && editMode === 'normal' },
  )
  useHotkeys(
    window,
    'KeyK',
    () => {
      if (todos.length === 0) return
      const now = Date.now()
      if (now - lastKeyJPressAtRef.current < 100) return
      lastKeyJPressAtRef.current = now
      const next = activeIndex > 0 ? activeIndex - 1 : todos.length - 1
      setActiveId(todos[next].id)
    },
    [activeIndex, todos, setActiveId, mode, menuOpen, editMode],
    { enabled: !mode && !menuOpen && editMode === 'normal' },
  )
  useHotkeys(window, 'KeyI', () => setMode('edit'), [editMode], {
    enabled: !mode && !menuOpen && editMode === 'normal',
  })
  useHotkeys(window, 'G', () => setActiveId(todos[0].id), [todos, menuOpen, editMode], {
    enabled: !mode && !menuOpen && editMode === 'normal',
  })
  // useHotkeys('g g', () => setIndex(0), { scopes: ['list'] }, [todos.length])
  useHotkeys(window, 'D', () => deleteActiveTodo(), [menuOpen, editMode], {
    enabled: !mode && !menuOpen && editMode === 'normal',
  })
  useHotkeys(
    window,
    'd',
    () => activeTodo && toggleDone(activeTodo.id),
    [activeTodo, menuOpen, editMode],
    {
      enabled: !mode && !menuOpen && editMode === 'normal',
    },
  )
  useHotkeys(
    window,
    'KeyS',
    () => {
      console.log(editMode)
      toggleShowDone()
      console.log(editMode)
    },
    [menuOpen, editMode],
    {
      enabled: !mode && !menuOpen && editMode === 'normal',
    },
  )

  return (
    <div ref={listRef} className="flex flex-1 flex-col gap-1 w-full overflow-auto">
      {todos.map((t, i) => (
        <TodoCard todo={t} isActive={i === activeIndex} key={t.id} />
      ))}
    </div>
  )
}
