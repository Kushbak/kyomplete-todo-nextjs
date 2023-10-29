'use client'

import { useRouter, useSearchParams } from "next/navigation"
import NewTaskModal from "./NewTask"

const Modals = () => {
  const searchParams = useSearchParams()
  
  if(!searchParams.size) return null
  if(searchParams.has('modal', 'new-task')) return <NewTaskModal />
}

export default Modals 