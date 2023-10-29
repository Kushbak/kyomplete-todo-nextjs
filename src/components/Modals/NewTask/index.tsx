'use client'

import ModalTemplate from "@/components/Modals/modal-template";
import { PAGES } from "@/const";
import { ITask, ITaskCreate } from "@/types";
import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import dayjs from "@/utils/dayjs";
import { tasksApi } from "@/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import styles from './index.module.scss'

interface Props {
  isEdit?: boolean
  initialValues?: ITask
}

const NewTaskModal = ({ initialValues, isEdit }: Props) => {
  const router = useRouter();
  const formik = useFormik<ITaskCreate>({
    initialValues: initialValues || {
      title: '',
      due_date: '',
    },
    enableReinitialize: true,
    onSubmit: async (data) => {
      console.log('submit', { data })
      try {
        await tasksApi.createTask(data)
        toast.success('Task has been created')
        router.refresh()
        onClose()
      } catch (e) {
        toast.error('Something went wrong on task creating')
        console.log(e, data)
      }
    }
  })

  const handleDateChange = (value: string | null) => {
    const val = dayjs(value).format('DD/MM/YYYY HH:mm')
    formik.setFieldValue('due_date', val)
  }

  const onClose = () => {
    router.push(PAGES.HOME)
  }

  const title = isEdit ? 'Edit Task' : 'New Task'

  return (
    <ModalTemplate title={title} onClose={onClose}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form className={styles.newTaskForm} onSubmit={formik.handleSubmit}>
          <TextField label='Title' name="title" onChange={formik.handleChange} required />
          {/* <Autocomplete
            options={top100Films}
            renderInput={params => <TextField {...params} label='Assign to' onChange={formik.handleChange} required />}
          /> */}
          <DateTimePicker label="Basic date time picker" onChange={handleDateChange} />
          <Button type="submit" className={styles.newTaskForm__submit} variant="contained">Submit</Button>
        </form>
      </LocalizationProvider>
    </ModalTemplate>
  )
}

export default NewTaskModal