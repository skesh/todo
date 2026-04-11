export interface ITodo {
  id: string,
  title: string,
  description: string,
  tags: string[],
  priority: boolean,
  date: string | undefined,
  endDate: string | null,

  repeat: string | undefined,

  created: string,
  done: boolean,
}
