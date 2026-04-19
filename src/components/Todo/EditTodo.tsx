import { FlameIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils.ts'
import { useProjectSelectors } from '@/store/projectsStore.ts'
import { type TodoState, useTodoActions, useTodoSelectors } from '@/store/todosStore'
import type { Todo } from '../../interfaces/todo.ts'
import { Field } from '../ui/field.tsx'
import { Input } from '../ui/input.tsx'
import { Label } from '../ui/label.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.tsx'
import { Textarea } from '../ui/textarea.tsx'
import { Toggle } from '../ui/toggle.tsx'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group.tsx'
import styles from './EditTodo.module.css'

interface EditTodoProps {
  initialTodo: Todo
  mode: TodoState['mode']
}

const repeatOptions = ['month', 'year', 'week']

export default function EditTodo({ initialTodo, mode }: EditTodoProps) {
  const [todo, setTodo] = useState<Todo>(initialTodo)

  const { activeTodo } = useTodoSelectors()
  const { addItem, editItemById } = useTodoActions()
  const { projects, activeProjectId } = useProjectSelectors()

  // const globalTags = useTags()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()

    if (mode === 'add') {
      if (activeProjectId) {
        setTodo({ ...todo, projectId: activeProjectId } as Todo)
      }
    }
  }, [todo, mode])

  function onSubmit() {
    if (!!mode && mode === 'add') {
      addItem(todo as Todo)
    }
    if (!!mode && mode === 'edit' && activeTodo) {
      editItemById(activeTodo.id, todo)
    }
  }

  return (
    <>
      <Field>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={todo.title}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          ref={inputRef}
        />
      </Field>

      <Field>
        <Label htmlFor="tags">Tags</Label>
        {/* <TagInput tags={tags} suggestedTags={globalTags} /> */}
      </Field>

      <div className="flex gap-4">
        <Field>
          <Label>Date</Label>
          <Input value={todo.date} onKeyDown={(e) => e.key === 'Enter' && onSubmit()} />
        </Field>

        <ToggleGroup type="single" value={todo.repeat} className={styles.repeatContainer}>
          {repeatOptions.map((option) => (
            <ToggleGroupItem
              key={option}
              className={cn(todo.repeat === option ? styles.activeItem : '', 'items-end')}
              value={option}
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={todo.description}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
      </Field>

      {projects.length > 0 && (
        <Field>
          <Label>Project</Label>
          <Select value={todo.projectId}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {projects.map((p) => (
                  <SelectItem value={p.id} key={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}

      <div className="flex gap-2">
        {/* onPressedChange={setPriority} */}
        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" pressed={todo.priority}>
          <FlameIcon className="group-data-[state=on]/toggle:fill-foreground" />
          High Priority
        </Toggle>
      </div>
    </>
  )
}
