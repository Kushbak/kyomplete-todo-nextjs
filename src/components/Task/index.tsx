'use client'

import { ITask } from "@/types"
import { Box, Checkbox, IconButton } from "@mui/material"
import styles from './index.module.scss'
import { Alarm, Edit } from "@mui/icons-material"
import { useState } from "react"

interface Props {
  task: ITask
}

const Task = ({ task }: Props) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const { title, is_completed } = task

  const handleOpenDateModal = () => setIsDateModalOpen(true)
  const handleCloseDateModal = () => setIsDateModalOpen(false)
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
      </div>

      {isDateModalOpen && <div onClick={handleCloseDateModal}>MODAL OPENED</div>}
    </Box>
  )
}

export default Task