import { FlameIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useProjectSelectors } from '@/store/projectsStore.ts'
import { type TodoState, useTodoActions, useTodoSelectors } from '@/store/todosStore'
import type { Todo } from '../../interfaces/todo.ts'
import { Field } from '../ui/field.tsx'
import { Input } from '../ui/input.tsx'
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
  const { control, handleSubmit, reset } = useForm<Todo>({
    defaultValues: initialTodo,
  })

  const { activeTodo } = useTodoSelectors()
  const { addItem, editItemById } = useTodoActions()
  const { projects } = useProjectSelectors()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    reset(initialTodo)
  }, [initialTodo, reset])

  useEffect(() => {
    inputRef.current?.focus()
  }, [mode])

  function onSubmit(data: Todo) {
    if (mode === 'add') {
      addItem(data)
    }
    if (mode === 'edit' && activeTodo) {
      editItemById(activeTodo.id, data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
              ref={(e) => {
                field.ref(e)
                inputRef.current = e
              }}
              placeholder="Title"
            />
          )}
        />
      </Field>
      <div className="flex gap-4">
        <Field>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
                placeholder="Start date"
              />
            )}
          />
        </Field>

        <Controller
          name="repeat"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              className="items-end gap-4"
              onValueChange={field.onChange}
            >
              {repeatOptions.map((option) => (
                <ToggleGroupItem
                  key={option}
                  value={option}
                  className={field.value === option ? '!bg-[deeppink] !text-white' : ''}
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
      </div>
      <Field>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Description"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
            />
          )}
        />
      </Field>
      {projects.length > 0 && (
        <Controller
          name="projectId"
          control={control}
          render={({ field }) => (
            <Field>
              <Select value={field.value} onValueChange={field.onChange}>
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
        />
      )}
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <div className="flex gap-2">
            <Toggle
              aria-label="Toggle bookmark"
              pressed={field.value}
              onPressedChange={field.onChange}
            >
              <FlameIcon className="group-data-[state=on]/toggle:fill-foreground" />
              High Priority
            </Toggle>
          </div>
        )}
      />
    </form>
  )
}
