'use client'

import { PAGES } from "@/utils/const"
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

const AddTaskButton = () => {
  const router = useRouter()

  const handleOpenNewTaskModal = () => {
    router.push(PAGES.NEW_TASK_MODAL)
  }
  return (
    <Button onClick={handleOpenNewTaskModal} startIcon={<Add />}>ADD TASK</Button>
  )
}

export default AddTaskButton