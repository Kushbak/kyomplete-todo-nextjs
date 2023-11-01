import TasksView from '@/components/TasksView'
import { tasksApi, usersApi } from '@/api'
import styles from './page.module.css'
import TaskFilterPanel from '@/components/TaskFilterPanel'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tasks = await tasksApi.getAllTasks(searchParams)
  const users = await usersApi.getAllUsers()
  return (
    <main className={styles.main}>
      <TaskFilterPanel users={users} />
      <TasksView tasks={tasks} />
    </main>
  )
}
