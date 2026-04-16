import { CircleDotIcon, CircleIcon, FlameIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ITodo } from '../../interfaces/todo'
import { Badge } from '../ui/badge'
import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item'
import styles from './todo.module.css'

function Todo({ todo, isActive }: { todo: ITodo; isActive: boolean }) {
  return (
    <Item className={cn(`${isActive && styles.active}`, todo.done && 'text-neutral-600')} data-todo>
      <ItemMedia variant="icon">{todo.done ? <CircleDotIcon /> : <CircleIcon />}</ItemMedia>
      <ItemContent>
        <ItemTitle>
          <span>{todo.title}</span>
          {todo.priority && <FlameIcon className="text-red-800" />}
        </ItemTitle>
        {/* <ItemDescription>{todo.description}</ItemDescription> */}
      </ItemContent>
      <div>{todo.date}</div>
      <div className="flex gap-1">
        {todo.tags?.length > 0 &&
          todo.tags.map((t) => (
            <Badge variant="secondary" key={t}>
              {t}
            </Badge>
          ))}
      </div>
      {/* <ItemActions> */}
      {/*   <Button>Action</Button> */}
      {/* </ItemActions> */}
    </Item>
  )
}

export default Todo
