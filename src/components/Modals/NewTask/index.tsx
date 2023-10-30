'use client'

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ModalTemplate from "@/components/Modals/modal-template";
import { ITaskForm, SelectOption } from "@/types";
import dayjs, { Dayjs } from "@/utils/dayjs";
import { tasksApi, usersApi } from "@/api";
import { convertToSelect, getToday, toRequestDateFormat } from "@/utils";
import styles from './index.module.scss'

interface Props {
  isEdit?: boolean
  onClose: () => void
}

const NewTaskModal = ({ isEdit, onClose }: Props) => {
  const [users, setUsers] = useState<SelectOption[]>([])
  const searchParams = useSearchParams()
  const router = useRouter();

  const createTask = async (data: ITaskForm) => {
    try {
      const body = {
        ...data,
        due_date: toRequestDateFormat(data.due_date),
        assigned_to: String(data.assigned_to?.value)
      }
      await tasksApi.createTask(body)
      toast.success('Task has been created')
    } catch (e) {
      toast.error('Something went wrong on task creating')
      console.log(e, data)
    }
  }

  const editTask = async (data: ITaskForm) => {
    try {
      const id = searchParams.get('id')
      const body = {
        ...data,
        due_date: toRequestDateFormat(data.due_date),
        assigned_to: String(data.assigned_to?.value)
      }
      await tasksApi.updateTask(Number(id), body)
      toast.success('Task has been updated')
    } catch (e) {
      toast.error('Something went wrong on task updating')
      console.log(e, data)
    }
  }

  const onSubmit = async (data: ITaskForm) => {
    isEdit ? await editTask(data) : await createTask(data)
    router.refresh()
    onClose()
  }

  const handleDateChange = (value: Dayjs | string | null) => {
    formik.setFieldValue('due_date', value)
  }

  const handleAssigneeChange = (data: SelectOption | null) => {
    formik.setFieldValue('assigned_to', data)
  }

  const title = isEdit ? 'Edit Task' : 'New Task'

  const formik = useFormik<ITaskForm>({
    initialValues: {
      title: '',
      due_date: getToday().add(1, 'day'),
      assigned_to: null
    },
    onSubmit,
  })

  useEffect(() => {
    if (!isEdit) return
    const getTask = async () => {
      const id = searchParams.get('id')
      if (id) {
        const task = await tasksApi.getTaskById(Number(id))
        formik.setFieldValue('title', task.title)
        formik.setFieldValue('due_date', dayjs(task.due_date))
        formik.setFieldValue('assigned_to', { label: task.assigned_to?.username, value: task.assigned_to?.id })
      }
    }
    getTask()
  }, [formik, isEdit, searchParams, users])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await usersApi.getAllUsers()
      setUsers(convertToSelect(data, 'username', 'id'))
    }
    fetchUsers()
  }, [])

  return (
    <ModalTemplate title={title} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className={styles.newTaskForm} onSubmit={formik.handleSubmit}>
          <TextField label='Title' name="title" value={formik.values.title} onChange={formik.handleChange} required autoFocus />
          <Autocomplete
            options={users}
            onChange={(e, data) => handleAssigneeChange(data)}
            value={formik.values.assigned_to}
            renderInput={params => <TextField {...params} label='Assign to' name="assigned_to" required />}
          />
          <DateTimePicker label="Basic date time picker" value={formik.values.due_date} onChange={handleDateChange} />
          <Button type="submit" className={styles.newTaskForm__submit} variant="contained">Submit</Button>
        </form>
      </LocalizationProvider>
    </ModalTemplate>
  )
}

export default NewTaskModal