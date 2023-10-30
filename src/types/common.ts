import { Dayjs } from "dayjs"

export interface IModal {
  title: string
  children: React.ReactNode
  props: any
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface FilterState {
  assigned_to?: SelectOption[]
  is_completed?: string
  due_date_from?: Dayjs
  due_date_to?: Dayjs
}