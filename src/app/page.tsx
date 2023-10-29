import TasksView from '@/components/TasksView'
import { tasksApi } from '@/api'
import styles from './page.module.css'

export default async function Home() {
  const tasks = await tasksApi.getAllTasks()
  return (
    <main className={styles.main}>
      <TasksView tasks={tasks} />
    </main>
  )
}
