import { useEffect } from 'react'
import { Todo } from '@/interfaces/todo'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'
import EditTodo from './EditTodo'

export default function TodoDrawer() {
  const { mode } = useTodoSelectors()
  const { setMode } = useTodoActions()
  const { activeTodo } = useTodoSelectors()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'o') {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('add')
        }
        return
      }

      if (e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        setMode(false)
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mode])

  return (
    <Drawer open={!!mode}>
      <DrawerContent className="px-4 py-4">
        <DrawerHeader hidden={true}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <EditTodo
          mode={mode}
          initialTodo={mode === 'edit' ? (activeTodo ?? new Todo()) : new Todo()}
        />
      </DrawerContent>
    </Drawer>
  )
}
