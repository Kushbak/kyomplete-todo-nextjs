import { Dayjs } from "dayjs"

export interface IModal {
  title: string
  children: React.ReactNode
  props: any
}

export interface SelectOption {
  label: string
  value: string | number
  id: string
}

export interface FilterState {
  assignedTo?: SelectOption[]
  isCompleted?: string
  dueDateFrom?: Dayjs | null
  dueDateTo?: Dayjs | null
}