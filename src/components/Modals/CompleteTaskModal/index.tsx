'use client'

import { useRouter, useSearchParams } from "next/navigation"
import ModalTemplate from "../modal-template"
import { Editor } from "react-draft-wysiwyg"
import styles from './index.module.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { tasksApi } from "@/api"
import { useState } from "react"
import { convertToRaw, EditorState } from "draft-js"
import { Button } from "@mui/material"
import { toast } from "react-toastify"

interface Props {
  onClose: () => void
}

const CompleteTask = ({ onClose }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async () => {
    const id = searchParams.get('id')
    if (id) {
      const contentState = editorState.getCurrentContent();
      const raw = convertToRaw(contentState)
      try {
        await tasksApi.updateTask(+id, { result: raw, is_completed: true })
        toast.success('Task has been successfully completed')
        onClose()
        router.refresh()
      } catch (e) {
        toast.error('Failed to mark the task complete. Please try again')
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
          <Button variant="contained" onClick={onSubmit}>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </ModalTemplate>
  )
}

export default CompleteTask