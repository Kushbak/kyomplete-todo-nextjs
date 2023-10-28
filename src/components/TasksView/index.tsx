import { Button } from "@mui/material"
import { Add } from "@mui/icons-material"
import { ITask, ITaskCreate } from "@/types"
import styles from './index.module.scss'
import Task from "../Task"

interface Props {
  tasks: ITask[]
  onAddTaskClick?: () => void
}

const TasksView = ({ tasks, onAddTaskClick }: Props) => {
  return (
    <div className={styles.tasksView}>
      {onAddTaskClick && <div className={styles.tasksView__header}>
        <Button onClick={onAddTaskClick} startIcon={<Add />}>ADD TASK</Button>
      </div>}
      <div className={styles.tasksView__content}>
        {tasks.map(item => <Task task={item} key={item.id} />)}
      </div>
    </div>
  )
}

export default TasksView