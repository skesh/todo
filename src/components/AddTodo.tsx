import { TodoState, useTodoStore } from "@/store/todosStore";
import { FlameIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ITodo } from "../interfaces/todo";
import styles from "./AddTodo.module.css";
import { TagInput } from "./ui-custom/TagInput";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group.tsx";
import { Toggle } from "./ui/toggle.tsx";
import { cn } from "@/lib/utils.ts";
import { useTags } from "@/hooks/useTags.tsx";
import { nanoid } from 'nanoid';

interface AddTodoProps {
  todo?: ITodo;
  mode: TodoState['mode'];
}

export default function AddTodo({ todo, mode }: AddTodoProps) {
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

  const repeatOptions = ['month', 'year', 'week']
  const globalTags = useTags()

  const activeId = useTodoStore((s) => s.activeId)
  const addItem = useTodoStore((s) => s.addItem)
  const editItem = useTodoStore((s) => s.editItemById)

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus()

    if (todo && mode === 'edit') {
      setId(todo.id)
      setTitle(todo.title)
      setDescription(todo.description)
      setTags(todo.tags)
      setPriority(todo.priority)
      setDate(todo.date)
      setEndDate(todo.endDate)
      setRepeat(todo.repeat)
      setCreated(todo.created)
      setDone(todo.done)
    }
  }, [todo, mode])

  function onSubmit() {
    const item = { id, title, description, tags, priority, date, endDate, repeat, created, done };
    if (!!mode && mode === 'add') {
      addItem(item);
    }
    if (!!mode && mode === 'edit') {
      editItem(activeId!, item)
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

      <div className="flex gap-2">
        <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" pressed={priority} onPressedChange={setPriority}>
          <FlameIcon className="group-data-[state=on]/toggle:fill-foreground" />
          High Priority
        </Toggle>
      </div>
    </>
  );
}
