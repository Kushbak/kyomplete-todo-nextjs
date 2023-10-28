'use client'

import { useRouter, useSearchParams } from "next/navigation"
import NewTaskModal from "./NewTask"

const Modals = () => {
  const searchParams = useSearchParams()
  console.log({ searchParams })
  
  if(!searchParams.size) return null
  if(searchParams.has('modal', 'new-task')) return <NewTaskModal />
}

export default Modals 