import { Formik } from 'formik'
import { FlameIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
    if (mode === 'add') {
      addItem(todo as Todo)
    }
    if (mode === 'edit' && activeTodo) {
      editItemById(activeTodo.id, todo)
    }
  }

  return (
    <Formik initialValues={todo} onSubmit={(values) => onSubmit(values)}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <Input
              id="title"
              value={values.title}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)}
              ref={inputRef}
              placeholder="Title"
            />
          </Field>

          <div className="flex gap-4">
            <Field>
              <Input
                id="date"
                value={values.date}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)}
                placeholder="Start date"
              />
            </Field>

            <ToggleGroup
              type="single"
              value={values.repeat}
              className="items-end gap-4"
              onValueChange={(value) => setFieldValue('repeat', value)}
            >
              {repeatOptions.map((option) => (
                <ToggleGroupItem
                  key={option}
                  value={option}
                  className={
                    !!values.repeat && values.repeat === option ? '!bg-[deeppink] !text-white' : ''
                  }
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <Field>
            <Textarea
              id="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Description"
              onKeyDown={(e) => e.key === 'Enter' && onSubmit(values)}
            />
          </Field>

          {projects.length > 0 && (
            <Field>
              <Select value={todo.projectId}>
                <SelectTrigger>
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
            <Toggle
              aria-label="Toggle bookmark"
              pressed={values.priority}
              onPressedChange={() => setFieldValue('priority', !values.priority)}
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
