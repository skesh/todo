import { useRef } from 'react'
import { useHotkeys } from '@/hooks/useHotkeys'
import type { Todo } from '@/interfaces/todo'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import { useUiActions, useUiSelectors } from '@/store/uiStore'

export function useTodoListKeybindings(todos: Todo[], activeIndex: number) {
  const lastKeyJPressAtRef = useRef(0)
  const { activeTodo, showDone } = useTodoSelectors()
  const { setActiveId, deleteActiveTodo, toggleDone, toggleShowDone } = useTodoActions()
  const { setTodoOpen } = useUiActions()
  const { menuOpen, editMode, todoOpen, sidebarOpen } = useUiSelectors()

  const hotkeysEnable = !todoOpen && !menuOpen && editMode === 'normal' && !sidebarOpen

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
    [activeIndex, todos, setActiveId, todoOpen, menuOpen, editMode, sidebarOpen],
    { enabled: hotkeysEnable },
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
    [activeIndex, todos, setActiveId, todoOpen, menuOpen, editMode, sidebarOpen],
    { enabled: hotkeysEnable },
  )
  useHotkeys(window, 'KeyI', () => setTodoOpen('edit'), [todoOpen, menuOpen, editMode, sidebarOpen], {
    enabled: hotkeysEnable,
  })
  useHotkeys(window, 'G', () => setActiveId(todos[0].id), [todos, menuOpen, editMode, sidebarOpen], {
    enabled: hotkeysEnable,
  })
  useHotkeys(
    window,
    'D',
    () => {
      deleteActiveTodo()
      moveActiveOnPrevTodoDone()
    },
    [menuOpen, editMode, sidebarOpen],
    { enabled: hotkeysEnable },
  )
  useHotkeys(
    window,
    'd',
    () => {
      if (activeTodo) {
        moveActiveOnPrevTodoDone()
        toggleDone(activeTodo.id)
      }
    },
    [activeTodo, menuOpen, editMode, sidebarOpen],
    {
      enabled: hotkeysEnable,
    },
  )
  useHotkeys(window, 'KeyS', () => toggleShowDone(), [menuOpen, editMode, sidebarOpen], {
    enabled: hotkeysEnable,
  })
  useHotkeys(window, 'KeyO', () => setTodoOpen('add'), [todoOpen, editMode, sidebarOpen], {
    enabled: hotkeysEnable,
  })

  useHotkeys(window, 'Escape', () => setTodoOpen(false), [todoOpen, editMode, sidebarOpen], {
    enabled: !!todoOpen && editMode === 'normal',
  })

  function moveActiveOnPrevTodoDone() {
    if (activeTodo?.done || showDone) return
    const index = todos.findIndex((t) => t.id === activeTodo?.id)
    if (index && index > 0) setActiveId(todos[index - 1].id)
  }
}
