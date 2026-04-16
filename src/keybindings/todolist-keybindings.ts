import { useEffect, useRef } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useTodoActions, useTodoSelectors } from '../store/todosStore'

export default function useTodoListKeybindings(
  activeIndex: number,
  totalItems: number,
  setIndex: (id: number) => void,
) {
  const { todos, mode, activeTodo } = useTodoSelectors()
  const { deleteActiveTodo, setMode, toggleDone, toggleShowDone } = useTodoActions()

  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now()
      const timeDiff = now - lastTimeRef.current

      if (!sidebarOpen && !mode) {
        if (e.key === 'j') {
          setIndex(activeIndex < totalItems - 1 ? activeIndex + 1 : 0)
          return
        }

        if (e.key === 'k') {
          setIndex(activeIndex > 0 ? activeIndex - 1 : todos.length - 1)
          return
        }

        if (e.key === 'i') {
          e.stopPropagation()
          e.preventDefault()
          setMode('edit')
          return
        }

        if (e.key === 'G') {
          setIndex(0)
          return
        }

        if (e.key === 'd') {
          if (activeTodo?.id) toggleDone(activeTodo.id)
        }

        if (e.key === 'D') {
          deleteActiveTodo()
          if (activeIndex === totalItems - 1) setIndex(activeIndex - 1)
          return
        }

        if (e.key === 'g' && lastKeyRef.current === 'g' && timeDiff < 300) {
          setIndex(todos.length - 1)
          return
        }

        if (e.key === 's') {
          toggleShowDone()
        }
      }

      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [todos, activeIndex, mode, sidebarOpen, totalItems, activeTodo])
}
