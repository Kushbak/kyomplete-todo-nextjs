import { ITask } from "@/types"
import styles from './index.module.scss'
import Task from "../Task"

interface Props {
  tasks: ITask[]
}

const TasksView = ({ tasks }: Props) => {
  return (
    <div className={styles.tasksView}>
      {tasks.length ? tasks.map(item => <Task task={item} key={item.id} />) : 'No Tasks'}
    </div>
  )
}

export default TasksView