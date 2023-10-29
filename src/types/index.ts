export interface ITask {
  id: number
  title: string
  is_completed: boolean
  due_date?: string

  assigned_to?: any
  author?: any 
}

export type ITaskCreate = Omit<ITask, 'id' | 'is_completed'>

export interface IModal {
  title: string
  children: React.ReactNode
  props: any
}