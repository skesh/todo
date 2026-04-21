import { cn } from '@/lib/utils'
import { useTodoSelectors, useTodoStore } from '@/store/todosStore'
import { useUiSeletors } from '@/store/uiStore'

export default function Footer() {
  const items = useTodoStore((s) => s.items)
  const activeId = useTodoStore((s) => s.activeId)
  const { mode } = useTodoSelectors()
  const { menuOpen, editMode } = useUiSeletors()

  return (
    <div className="sticky bottom-0 flex w-full shrink-0 gap-2 bg-background items-center">
      <div
        className={cn(
          editMode !== 'edit' && 'bg-green-500 px-2',
          editMode === 'edit' && 'bg-blue-500 px-2',
        )}
      >
        {editMode.toUpperCase()}
      </div>
      <div className="ml-auto">
        <span>MENU: {menuOpen.toString()}</span>
        <span>MODE: {mode.toString()}</span>
        <span>Active TODO ID: {activeId}</span>
        <span>total: {items.length}</span>
      </div>
    </div>
  )
}
