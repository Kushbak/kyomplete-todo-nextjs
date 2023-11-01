'use client'

import { usersApi } from "@/api"
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const CreateUserBtn = () => {
  const router = useRouter()
  const createUser = async () => {
    try {
      const random = Math.floor(Math.random() * 10000);
      await usersApi.createUser({
        email: `kyowner${random}@gmail.com`,
        password: String(random),
        username: `kyowner${random}`,
      })
      toast.success('Random User created successfully')
      router.refresh()
    } catch(e) {
      toast.error('Failed to create User')
    }
  }
  
  return (
    <Button onClick={createUser} startIcon={<Add />}>CREATE RANDOM USER</Button>
  )
}

export default CreateUserBtn