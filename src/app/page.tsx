'use client'

import styles from './page.module.css'
import TasksView from '@/components/TasksView'
import { ITask, ITaskCreate } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PAGES } from '@/const'
import Layout from '@/components/Layout'
const mock_tasks: ITask[] = [
  {
    id: 1,
    is_completed: false,
    title: 'FIRST TASK',
  },
  {
    id: 2,
    is_completed: false,
    title: 'SECOND TASK',
  }
]

export default function Home(props: any) {
  const [tasks, setTasks] = useState(mock_tasks)
  const router = useRouter()
  
  const onAddTask = () => {
    router.push(PAGES.NEW_TASK_MODAL)
  }
  return (
    <Layout>
      <main className={styles.main}>
        <TasksView tasks={tasks} onAddTaskClick={onAddTask} />
      </main>
    </Layout>
  )
}
