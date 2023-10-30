import { ITask } from "@/types"
import { Box, Checkbox, Tooltip } from "@mui/material"
import styles from './index.module.scss'
import dayjs from '@/utils/dayjs'
import classNames from "classnames"
import ActionsPanel from "./ActionsPanel"
import { REQUEST_DATE_FORMAT } from "@/utils/const"
import CompleteTask from "./CompleteTask"

interface Props {
  task: ITask
}

const Task = ({ task }: Props) => {
  const isOverdue = (date: string) => {
    return !task.is_completed && dayjs().isAfter(date);
  }
  const { title, due_date, assigned_to } = task
  return (
    <Box className={classNames(styles.task, task.is_completed && styles.task_completed)}>
      <CompleteTask taskId={task.id} is_completed={task.is_completed} />
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__actions}>
        {assigned_to?.username &&
          <Tooltip title={assigned_to?.username}>
            <div className={styles.task__assignee}>{assigned_to?.username[0]}</div>
          </Tooltip>
        }
        <ActionsPanel taskId={task.id} due_date={due_date} />
      </div>
      <div className={classNames(styles.task__due, isOverdue(due_date) && styles.task__due_over)}>
        {dayjs(due_date).format(REQUEST_DATE_FORMAT)}
      </div>
    </Box>
  )
}

export default Task