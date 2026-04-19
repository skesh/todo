import { nanoid } from 'nanoid'

export class Todo {
  id: string
  title: string
  description: string
  tags: string[]
  priority: boolean
  date: string
  endDate: string
  projectId: string
  repeat: string
  created: string
  doneDate: string
  done: boolean = false

  constructor(todo?: Partial<Todo>) {
    this.id = todo?.id || nanoid()
    this.title = todo?.title || ''
    this.description = todo?.description || ''
    this.tags = todo?.tags || []
    this.priority = todo?.priority || false
    this.date = todo?.date || ''
    this.endDate = todo?.endDate || ''
    this.projectId = todo?.projectId || ''
    this.repeat = todo?.repeat || ''
    this.created = todo?.created || new Date().toISOString()
    this.doneDate = todo?.doneDate || ''
    this.done = todo?.done || false
  }
}
