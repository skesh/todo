import { useEffect, useRef, useState } from 'react'
import type { ITodo } from '@/interfaces/todo'
import useTodoListKeybindings from '@/keybindings/todolist-keybindings'
import { useTodoSelectors, useTodoStore } from '../../store/todosStore'
import Todo from './Todo'

export default function TodoList({ todos }: { todos: ITodo[] }) {
  const [activeIndex, setIndex] = useState(-1)
  const { showDone } = useTodoSelectors()
  const setActiveId = useTodoStore((s) => s.setActiveId)

  const listRef = useRef<HTMLDivElement>(null)

  const filtredTodos = showDone ? todos : todos.filter((t) => !t.done)

  useTodoListKeybindings(activeIndex, todos.length, setIndex)

  useEffect(() => {
    if (activeIndex >= 0) {
      if (todos[activeIndex]?.id) setActiveId(todos[activeIndex]?.id)
    }
  }, [activeIndex, todos])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const container = listRef.current
      const elements = container.querySelectorAll('[data-todo]')
      const target = elements[activeIndex] as HTMLElement

      if (target) {
        const containerRect = container.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        // Если элемент вне видимой области - скроллим
        if (targetRect.top < containerRect.top || targetRect.bottom > containerRect.bottom) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }, [activeIndex])

  return (
    <div className="flex flex-1 flex-col gap-1 w-full overflow-auto" ref={listRef}>
      {filtredTodos.length > 0 &&
        filtredTodos.map((t, index) => (
          <Todo todo={t} key={t.id} isActive={index === activeIndex} />
        ))}
    </div>
  )
}
