'use client'

import { ITask } from "@/types"
import { Box, Checkbox, IconButton } from "@mui/material"
import styles from './index.module.scss'
import { Alarm, Delete, Edit } from "@mui/icons-material"
import { useState } from "react"
import dayjs from '@/utils/dayjs'
import classNames from "classnames"
import { tasksApi } from "@/api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
interface Props {
  task: ITask
}

const Task = ({ task }: Props) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOpenDateModal = () => setIsDateModalOpen(true)
  const handleCloseDateModal = () => setIsDateModalOpen(false)

  const isOverdue = (date: string) => {
    return dayjs(new Date()).isAfter(dayjs(date));
  }

  const handleDeleteTask = async () => {
    setIsLoading(true)
    try {
      await tasksApi.deleteTask(task.id)
      toast.success('Task has been deleted')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  
  const { title, due_date } = task
  return (
    <Box className={styles.task}>
      <Checkbox color="primary" />
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__actions}>
        <IconButton aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton onClick={handleOpenDateModal} aria-label="due">
          <Alarm />
        </IconButton>
        <IconButton onClick={handleDeleteTask}>
          <Delete />
        </IconButton>
      </div>
      {due_date &&
        <div className={classNames(styles.task__due, isOverdue(due_date) && styles.task__due_over)}>
          {due_date}
        </div>
      }

      {isDateModalOpen && <div onClick={handleCloseDateModal}>MODAL OPENED</div>}
    </Box>
  )
}

export default Task