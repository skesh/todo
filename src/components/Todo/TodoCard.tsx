import { CircleDotIcon, CircleIcon, FlameIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProjectSelectors } from '@/store/projectsStore'
import type { Todo } from '../../interfaces/todo'
import { Badge } from '../ui/badge'
import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item'
import styles from './todo.module.css'

function TodoCard({ todo, isActive }: { todo: Todo; isActive: boolean }) {
  const { projects } = useProjectSelectors()

  return (
    <Item
      className={cn(`${isActive && styles.active}`, todo.done && 'text-neutral-600')}
      data-id={todo.id}
    >
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
        {/* {todo.tags?.length > 0 && */}
        {/*   todo.tags.map((t) => ( */}
        {/*     <Badge variant="secondary" key={t}> */}
        {/*       {t} */}
        {/*     </Badge> */}
        {/*   ))} */}
        {todo.projectId && <Badge variant="link">{projects.find(p => p.id === todo.projectId)?.name}</Badge>}
      </div>
      {/* <ItemActions> */}
      {/*   <Button>Action</Button> */}
      {/* </ItemActions> */}
    </Item>
  )
}

export default TodoCard
