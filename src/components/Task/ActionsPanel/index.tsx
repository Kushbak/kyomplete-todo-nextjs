'use client'

import { tasksApi } from "@/api"
import { toDatePickerStateFormat, toRequestDateFormat } from "@/utils"
import { PAGES, TIME_INTERVALS } from "@/utils/const"
import { Alarm, Delete, Edit } from "@mui/icons-material"
import { IconButton, MenuItem, TextField } from "@mui/material"
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "@/utils/dayjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { propagateServerField } from "next/dist/server/lib/render-server"
import { Dayjs } from "dayjs"

interface Props {
  taskId: number
  due_date: string
}

const UpdateDueIcon = (props: any) => (
  <IconButton {...props} aria-label="due">
    <Alarm />
  </IconButton>
)

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
    router.push(PAGES.EDIT_TASK_MODAL + taskId)
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
      <MobileDateTimePicker
        ampm
        autoFocus
        slots={{
          field: UpdateDueIcon,
          textField: TimeSlot,
        }}
        onOpen={handleOpenDueModal}
        onClose={handleCloseDueModal}
        open={isUpdateDueModalOpen}
        onAccept={handleSaveUpdatedDue}
        defaultValue={dayjs(due_date)}
      />
      <IconButton onClick={handleDeleteTask} aria-label="delete">
        <Delete />
      </IconButton>
    </LocalizationProvider>
  )
}

export default ActionsPanel