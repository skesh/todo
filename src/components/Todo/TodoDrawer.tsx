import { useMemo } from 'react'
import { useHotkeys } from '@/hooks/useHotkeys'
import { Todo } from '@/interfaces/todo'
import { useProjectSelectors } from '@/store/projectsStore'
import { useTodoSelectors } from '@/store/todosStore'
import { useUiActions, useUiSeletors } from '@/store/uiStore'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'
import EditTodo from './EditTodo'

export default function TodoDrawer() {
  const { activeTodo } = useTodoSelectors()
  const { todoOpen, editMode } = useUiSeletors()
  const { setTodoOpen } = useUiActions()
  const { activeProjectId } = useProjectSelectors()

  const initialTodo = useMemo(() => {
    if (todoOpen === 'edit') {
      return activeTodo ?? new Todo()
    }
    return new Todo({ projectId: activeProjectId ?? '' })
  }, [todoOpen, activeTodo, activeProjectId])

  useHotkeys(window, 'o', () => setTodoOpen('add'), [todoOpen, editMode], {
    enabled: !todoOpen && editMode === 'normal',
  })

  useHotkeys(window, 'Escape', () => setTodoOpen(false), [todoOpen, editMode], {
    enabled: !!todoOpen && editMode === 'normal',
  })

  return (
    <Drawer open={!!todoOpen}>
      <DrawerContent className="px-4 py-4">
        <DrawerHeader hidden={true}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>

        <EditTodo todoOpen={todoOpen} initialTodo={initialTodo} />
      </DrawerContent>
    </Drawer>
  )
}
