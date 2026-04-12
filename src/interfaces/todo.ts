export interface ITodo {
  id: string,
  title: string,
  description: string,
  tags: string[],
  priority: boolean,
  date: string | undefined,
  endDate: string | null,
  projectId: string | undefined,

  repeat: string | undefined,

  created: string,
  done: boolean,
}
