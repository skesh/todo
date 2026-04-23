import { useHotkeys } from '@/hooks/useHotkeys'
import { Todo } from '@/interfaces/todo'
import { useProjectSelectors } from '@/store/projectsStore'
import { useTodoActions, useTodoSelectors } from '@/store/todosStore'
import { useUiSeletors } from '@/store/uiStore'
import { useMemo } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'
import EditTodo from './EditTodo'

export default function TodoDrawer() {
  const { mode, activeTodo } = useTodoSelectors()
  const { setMode } = useTodoActions()
  const { activeProjectId } = useProjectSelectors()
  const { editMode } = useUiSeletors()

  const initialTodo = useMemo(() => {
    if (mode === 'edit') {
      return activeTodo ?? new Todo()
    }
    return new Todo({ projectId: activeProjectId ?? '' })
  }, [mode, activeTodo, activeProjectId])

  useHotkeys(window, 'o', () => setMode('add'), [mode, editMode], {
    enabled: !mode && editMode === 'normal',
  })

  useHotkeys(window, 'Escape', () => setMode(false), [mode], {
    enabled: !!mode,
  })

  return (
    <Drawer open={!!mode}>
      <DrawerContent className="px-4 py-4">
        <DrawerHeader hidden={true}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>

        <EditTodo mode={mode} initialTodo={initialTodo} />
      </DrawerContent>
    </Drawer>
  )
}
