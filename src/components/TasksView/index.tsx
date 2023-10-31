import { ITask } from "@/types"
import Task from "../Task"
import TaskFilterPanel from "../TaskFilterPanel"
import styles from './index.module.scss'

interface Props {
  tasks: ITask[]
}

const TasksView = ({ tasks = [] }: Props) => {
  return (
    <div className={styles.tasksView}>
      <TaskFilterPanel />
      <div className={styles.tasksView__list}>
        {tasks.length ? tasks.map(item => <Task task={item} key={item.id} />) : 'No Tasks'}
      </div>
    </div>
  )
}

export default TasksView