'use client'

import { useSearchParams } from "next/navigation"
import NewTaskModal from "./NewTask"
import CompleteTask from "./CompleteTaskModal"

const Modals = () => {
  const searchParams = useSearchParams()
  
  if(!searchParams.size) return null
  if(searchParams.has('modal', 'new-task')) return <NewTaskModal />
  if(searchParams.has('modal', 'edit-task')) return <NewTaskModal isEdit />
  if(searchParams.has('modal', 'complete-task')) return <CompleteTask />
}

export default Modals