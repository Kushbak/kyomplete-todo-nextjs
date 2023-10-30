'use client'

import { usersApi } from "@/api"
import { FilterState, SelectOption } from "@/types"
import { convertToSelect, hasValue, objectToSearchParams, searchParamsToObject, toDatePickerStateFormat, toRequestDateFormat } from "@/utils"
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PAGES } from "@/utils/const"
import styles from './index.module.scss'
import { Dayjs } from "dayjs"

const TaskFilterPanel = () => {
  const [users, setUsers] = useState<SelectOption[]>([])
  const [filters, setFilters] = useState<FilterState>({})
  const router = useRouter()

  const handleChange = (name: string, value: string | SelectOption[] | Dayjs | null) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const fetchFilters = () => {
    const assignedStr = filters.assigned_to?.map(item => item.value).join(',')
    const params = {
      assigned_to: assignedStr,
      due_date_from: filters.due_date_from ? toRequestDateFormat(filters.due_date_from) : null,
      due_date_to: filters.due_date_to ? toRequestDateFormat(filters.due_date_to, true) : null,
      is_completed: filters.is_completed,
    }
    const searchParams = objectToSearchParams(params).toString()

    router.push(PAGES.HOME + '?' + searchParams)
    router.refresh()
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await usersApi.getAllUsers()
      setUsers(convertToSelect(data, 'username', 'id'))
    }
    fetchUsers()
  }, [])

  // useEffect(() => {
  //   const params: FilterState = searchParamsToObject(searchParams)

    // if (params.due_date_from) {
    //   params.due_date_from = toDatePickerStateFormat(params.due_date_from)
    // }
    // if (params.due_date_to) {
    //   params.due_date_to = toDatePickerStateFormat(params.due_date_to)
    // }

  //   setFilters(params)
  // }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.taskFilterPanel}>
        <Autocomplete
          options={users}
          value={filters.assigned_to}
          onChange={(e, value) => handleChange('assigned_to', value)}
          renderInput={params => <TextField {...params} label='Assigned to' />}
          multiple
          disableCloseOnSelect
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Completed</InputLabel>
          <Select<string>
            label='Completed'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            unselectable="on"
            value={filters.is_completed}
            onChange={(e) => handleChange('is_completed', e.target.value)}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='true'>Completed</MenuItem>
            <MenuItem value='false'>Not Completed</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          slotProps={{
            field: { clearable: true },
          }}
          value={filters.due_date_from}
          label='Due Date From'
          onChange={(value) => handleChange('due_date_from', value)}
          closeOnSelect
        />
        <DatePicker
          slotProps={{
            field: { clearable: true },
          }}
          value={filters.due_date_to}
          label='Due Date To'
          onChange={(value) => handleChange('due_date_to', value)}
          closeOnSelect
        />
        <Button onClick={fetchFilters} variant="contained">Filter</Button>
      </div>
    </LocalizationProvider>
  )
}

export default TaskFilterPanel