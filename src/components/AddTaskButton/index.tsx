'use client'

import { MODAL_KEYS } from "@/utils/const"
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

const AddTaskButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleOpenNewTaskModal = () => {
    const searchParamsWithModal = new URLSearchParams(searchParams)
    searchParamsWithModal.append('modal', MODAL_KEYS.NEW_TASK)
    router.push(`${pathname}?${searchParamsWithModal}` )
  }

  return (
    <Button onClick={handleOpenNewTaskModal} startIcon={<Add />}>ADD TASK</Button>
  )
}

export default AddTaskButton