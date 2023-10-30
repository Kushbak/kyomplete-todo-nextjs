'use client'

import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { usersApi } from "@/api"
import { PAGES } from "@/utils/const"
import { FilterState, SelectOption } from "@/types"
import { convertToSelect, objectToSearchParams, searchParamsToObject, toRequestDateFormat } from "@/utils"
import dayjs, { Dayjs } from '@/utils/dayjs'
import styles from './index.module.scss'

const TaskFilterPanel = () => {
  const [users, setUsers] = useState<SelectOption[]>([])
  const [filters, setFilters] = useState<FilterState>({})
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (name: string, value: string | SelectOption[] | Dayjs | null) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const applyFilters = () => {
    const assignedStr = filters.assignedTo?.map(item => item.value).join(',')
    const params = {
      assigned_to: assignedStr,
      due_date_from: filters.dueDateFrom ? toRequestDateFormat(filters.dueDateFrom) : null,
      due_date_to: filters.dueDateTo ? toRequestDateFormat(filters.dueDateTo, true) : null,
      is_completed: filters.isCompleted,
    }
    const searchParams = objectToSearchParams(params).toString()

    router.push(`${PAGES.HOME}?${searchParams}`)
    router.refresh()
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await usersApi.getAllUsers()
      setUsers(convertToSelect(data, 'username', 'id'))
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const params = searchParamsToObject(searchParams)
    const filtersParams: FilterState = {}
    if (params.due_date_from) {
      filtersParams.dueDateFrom = dayjs(params.due_date_from)
    }
    if (params.due_date_to) {
      filtersParams.dueDateTo = dayjs(params.due_date_to)
    }
    if(params.assigned_to) {
      const assignedUsersFilter = params.assigned_to.split(',')
      const assignedUsersToSelect = users.filter(item => assignedUsersFilter.includes(String(item.value)))
      filtersParams.assignedTo = assignedUsersToSelect
    }
    if(params.is_completed) {
      filtersParams.isCompleted = params.is_completed
      handleChange('isCompleted', params.is_completed)
    }

    setFilters(filtersParams)
  }, [users])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.taskFilterPanel}>
        <Autocomplete
          options={users}
          value={filters.assignedTo}
          onChange={(e, value) => handleChange('assignedTo', value)}
          renderInput={params => <TextField {...params} label='Assigned to' />}
          multiple
          disableCloseOnSelect
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Is Completed</InputLabel>
          <Select<string>
            label='Is Completed'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.isCompleted}
            onChange={(e) => handleChange('isCompleted', e.target.value)}
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
          value={filters.dueDateFrom}
          label='Due Date From'
          onChange={(value) => handleChange('dueDateFrom', value)}
          closeOnSelect
        />
        <DatePicker
          slotProps={{
            field: { clearable: true },
          }}
          value={filters.dueDateTo}
          label='Due Date To'
          onChange={(value) => handleChange('dueDateTo', value)}
          closeOnSelect
        />
        <Button onClick={applyFilters} variant="contained">Apply Filters</Button>
      </div>
    </LocalizationProvider>
  )
}

export default TaskFilterPanel