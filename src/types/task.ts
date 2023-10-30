import { RawDraftContentState } from "react-draft-wysiwyg"
import { SelectOption } from "./common"
import { IUser } from "./user"

export interface ITask {
  id: number
  title: string
  is_completed: boolean
  due_date: string
  assigned_to?: IUser
  author?: IUser
  result?: RawDraftContentState
}

export interface ITaskForm {
  title: string
  due_date: string | null
  assigned_to: SelectOption | null
  author?: IUser
}

export interface ITaskRequest {
  title?: string
  due_date?: string | null
  assigned_to?: string | number | null
  is_completed?: boolean
  author?: IUser
  result?: RawDraftContentState
}

export interface ITaskComplete {
  result?: RawDraftContentState
}