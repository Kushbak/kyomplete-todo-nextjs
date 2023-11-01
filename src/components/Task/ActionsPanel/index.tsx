'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Alarm, Delete, Edit } from "@mui/icons-material"
import { IconButton, MenuItem, TextField, TextFieldProps } from "@mui/material"
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { tasksApi } from "@/api"
import { toRequestDateFormat } from "@/utils"
import { MODAL_KEYS, TIME_INTERVALS } from "@/utils/const"
import dayjs, { Dayjs } from "@/utils/dayjs"

interface Props {
  taskId: number
  due_date: string
}

// to add 30min interval time picker
const TimeSlot = (props: any) => (
  <TextField
    {...props}
    fullWidth
    select
    SelectProps={{
      displayEmpty: true,
      renderValue: (value) => value || 'Select Time',
    }}
  >
    {TIME_INTERVALS.map((time) => (
      <MenuItem key={time} value={time}>
        {time}
      </MenuItem>
    ))}
  </TextField>
)

const ActionsPanel = ({ taskId, due_date }: Props) => {
  const [isUpdateDueModalOpen, setIsUpdateDueModalOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleDeleteTask = async () => {
    try {
      await tasksApi.deleteTask(taskId)
      toast.success('Task has been deleted')
      router.refresh()
    } catch (e) {
      toast.error('Something went wrong')
    }
  }

  const handleOpenEditTask = () => {
    const searchParamsWithModal = new URLSearchParams(searchParams)
    searchParamsWithModal.append('modal', MODAL_KEYS.EDIT_TASK)
    searchParamsWithModal.append('id', String(taskId))
    router.push(`${pathname}?${searchParamsWithModal}`)
  }

  const handleOpenDueModal = () => setIsUpdateDueModalOpen(true)
  const handleCloseDueModal = () => setIsUpdateDueModalOpen(false)

  const handleSaveUpdatedDue = async (value: Dayjs | null) => {
    if (!value) {
      return handleCloseDueModal()
    }
    await tasksApi.updateTask(taskId, {
      due_date: toRequestDateFormat(value)
    })
    handleCloseDueModal()
    router.refresh()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <IconButton onClick={handleOpenEditTask} aria-label="edit">
        <Edit />
      </IconButton>
      <IconButton onClick={handleOpenDueModal} aria-label="due">
        <Alarm />
      </IconButton>
      {isUpdateDueModalOpen &&
        <MobileDateTimePicker
          ampm
          autoFocus
          slots={{
            textField: () => <></>,
          }}
          onClose={handleCloseDueModal}
          open={isUpdateDueModalOpen}
          onAccept={handleSaveUpdatedDue}
          defaultValue={dayjs(due_date)}
        />
      }
      <IconButton onClick={handleDeleteTask} aria-label="delete">
        <Delete />
      </IconButton>
    </LocalizationProvider>
  )
}

export default ActionsPanel