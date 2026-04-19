import { Formik } from 'formik'
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
// import { TagInput } from '../ui-custom/TagInput.tsx'
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

  function onSubmit(todo: Todo) {
    console.log(todo)
    if (mode === 'add') {
      addItem(todo as Todo)
    }
    if (mode === 'edit' && activeTodo) {
      editItemById(activeTodo.id, todo)
    }
  }

  return (
    <Formik initialValues={todo} onSubmit={(values) => onSubmit(values)}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={values.title}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)}
              ref={inputRef}
            />
          </Field>

          <div className="flex gap-4">
            <Field>
              <Label>Date</Label>
              <Input value={todo.date} onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)} />
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
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)}
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

          {/* <Field> */}
          {/*   <Label htmlFor="tags">Tags</Label> */}
          {/*   <TagInput tags={todo.tags} onChange={handleChange} suggestedTags={globalTags} /> */}
          {/* </Field> */}

          <div className="flex gap-2">
            <Toggle
              aria-label="Toggle bookmark"
              size="sm"
              variant="outline"
              pressed={todo.priority}
              onPressedChange={handleChange}
            >
              <FlameIcon className="group-data-[state=on]/toggle:fill-foreground" />
              High Priority
            </Toggle>
          </div>
        </form>
      )}
    </Formik>
  )
}
