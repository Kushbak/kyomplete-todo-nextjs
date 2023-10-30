'use client'

import { MODAL_KEYS } from "@/utils/const"
import { Checkbox } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
  taskId: number
  is_completed: boolean
}

const CompleteTask = ({ taskId, is_completed }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onClick = () => {
    const searchParamsWithModal = new URLSearchParams(searchParams)
    searchParamsWithModal.append('modal', MODAL_KEYS.COMPLETE_TASK)
    searchParamsWithModal.append('id', String(taskId))
    router.push(`${pathname}?${searchParamsWithModal}` )
  }
  
  return (
    <Checkbox onClick={onClick} color="primary" checked={is_completed} />
  )
}

export default CompleteTask