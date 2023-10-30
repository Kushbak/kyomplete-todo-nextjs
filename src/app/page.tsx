import TasksView from '@/components/TasksView'
import { tasksApi } from '@/api'
import styles from './page.module.css'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tasks = await tasksApi.getAllTasks(searchParams)
  return (
    <main className={styles.main}>
      <TasksView tasks={tasks} />
    </main>
  )
}
