'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import NewTaskModal from "./NewTask"
import CompleteTask from "./CompleteTaskModal"

export type ModalTypes = 'new-task' | 'edit-task' | 'complete-task'

const Modals = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const modalType = searchParams.get('modal') 
  
  if(!modalType) return null

  const handleCloseModal = () => {
    const searchParamsWithoutModal = new URLSearchParams(searchParams)
    searchParamsWithoutModal.delete('modal')
    router.push(`${pathname}?${searchParamsWithoutModal}`)
  }

  const ModalMap = {
    'new-task': <NewTaskModal onClose={handleCloseModal} />,
    'edit-task': <NewTaskModal onClose={handleCloseModal} isEdit />,
    'complete-task': <CompleteTask onClose={handleCloseModal} />
  }

  return ModalMap[modalType as ModalTypes]
}

export default Modals