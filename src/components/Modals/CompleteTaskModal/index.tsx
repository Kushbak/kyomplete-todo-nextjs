'use client'

import { useState } from "react"
import { convertToRaw, EditorState } from "draft-js"
import { Button } from "@mui/material"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { Editor } from "react-draft-wysiwyg"
import ModalTemplate from "../modal-template"
import { tasksApi } from "@/api"
import styles from './index.module.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  onClose: () => void
}

const CompleteTask = ({ onClose }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async () => {
    const id = searchParams.get('id')
    if (id) {
      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState)
      setIsLoading(true)
      try {
        await tasksApi.updateTask(+id, { result: raw, is_completed: true })
        toast.success('Task has been successfully completed')
        onClose()
        router.refresh()
      } catch (e) {
        toast.error('Failed to mark the task complete. Please try again')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <ModalTemplate title="Complete Task" onClose={onClose}>
      <div className={styles.completeTask}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorClassName={styles.completeTask__editor}
        />
        <div className="styles completeTask__actions">
          <Button variant="contained" onClick={onSubmit}>{isLoading ? 'Saving...' : 'Save'}</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </ModalTemplate>
  )
}

export default CompleteTask