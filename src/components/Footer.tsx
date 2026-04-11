import { useTodoStore } from "@/store/todosStore"

export default function Footer() {
  const items = useTodoStore((s) => s.items)
  const activeId = useTodoStore((s) => s.activeId)

  return (
    <div className='flex w-full shrink-0 gap-2 justify-end'>
      <span>{activeId}</span>
      <span>total: {items.length}</span>
    </div>
  )
}
