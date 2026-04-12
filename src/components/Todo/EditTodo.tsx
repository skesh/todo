import { useTags } from "@/hooks/useTags.tsx";
import { cn } from "@/lib/utils.ts";
import { useProjectSelectors } from "@/store/projectsStore.ts";
import { TodoState, useTodoActions, useTodoSelectors } from "@/store/todosStore";
import { FlameIcon } from "lucide-react";
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from "react";
import { ITodo } from "../../interfaces/todo.ts";
import { TagInput } from "../ui-custom/TagInput.tsx";
import { Field } from "../ui/field.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group.tsx";
import { Toggle } from "../ui/toggle.tsx";
import styles from "./EditTodo.module.css";

interface EditTodoProps {
  mode: TodoState['mode'];
}

const repeatOptions = ['month', 'year', 'week']

export default function EditTodo({ mode }: EditTodoProps) {
  const { activeTodo } = useTodoSelectors()
  const { addItem, editItemById } = useTodoActions()

  const { projects, activeProjectId } = useProjectSelectors()
  const globalTags = useTags()

  const [id, setId] = useState(nanoid())
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [priority, setPriority] = useState<boolean>(false)
  const [date, setDate] = useState<ITodo['date']>(undefined)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [repeat, setRepeat] = useState<ITodo['repeat']>(undefined)
  const [created, setCreated] = useState(new Date().toString())
  const [done, setDone] = useState(false)
  const [projectId, setProjectId] = useState<string | undefined>(undefined)

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus()

    if (activeTodo && mode === 'edit') {
      setId(activeTodo.id)
      setTitle(activeTodo.title)
      setDescription(activeTodo.description)
      setTags(activeTodo.tags)
      setPriority(activeTodo.priority)
      setDate(activeTodo.date)
      setEndDate(activeTodo.endDate)
      setRepeat(activeTodo.repeat)
      setCreated(activeTodo.created)
      setDone(activeTodo.done)
    }

    if (mode === 'add') {
      if (!!activeProjectId) {
        setProjectId(activeProjectId)
      }
    }

  }, [activeTodo, mode])

  function onSubmit() {
    const item = { id, title, description, tags, priority, date, endDate, repeat, created, done, projectId };
    if (!!mode && mode === 'add') {
      addItem(item);
    }
    if (!!mode && mode === 'edit' && activeTodo) {
      editItemById(activeTodo.id, item)
    }
  }

  return (
    <>
      <Field>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          ref={inputRef}
        />
      </Field>

      <Field>
        <Label htmlFor="tags">Tags</Label>
        <TagInput tags={tags} suggestedTags={globalTags} onChange={setTags} />
      </Field>

      <div className="flex gap-4">
        <Field>
          <Label>Date</Label>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          />
        </Field >

        <ToggleGroup type="single" value={repeat} onValueChange={setRepeat} className={styles.repeatContainer}>
          {repeatOptions.map((option, index) => (
            <ToggleGroupItem key={index} className={cn((repeat === option ? styles.activeItem : ''), 'items-end')} value={option}>{option}</ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div >

      <Field>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
      </Field>

      {projects.length > 0 && <Field>
        <Label>Project</Label>
        <Select value={projectId} onValueChange={setProjectId}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {projects.map((p, index) => <SelectItem value={p.id} key={index}>{p.name}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>}

      <div className="flex gap-2">
        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" pressed={priority} onPressedChange={setPriority}>
          <FlameIcon className="group-data-[state=on]/toggle:fill-foreground" />
          High Priority
        </Toggle>
      </div>
    </>
  );
}
