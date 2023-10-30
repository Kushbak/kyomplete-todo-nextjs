'use client'

import { PAGES } from "@/utils/const"
import { Checkbox } from "@mui/material"
import { useRouter } from "next/navigation"

interface Props {
  taskId: number
  is_completed: boolean
}

const CompleteTask = ({ taskId, is_completed }: Props) => {
  const router = useRouter()

  const onClick = () => {
    router.push(PAGES.COMPLETE_TASK_MODAL + taskId)
  }
  
  return (
    <Checkbox onClick={onClick} color="primary" checked={is_completed} />
  )
}

export default CompleteTask