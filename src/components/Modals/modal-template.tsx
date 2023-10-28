import { Modal, Paper } from "@mui/material"
import styles from './index.module.scss'

interface Props {
  title?: string
  onClose: () => void
  children: React.ReactElement
}

const ModalTemplate = ({ title, children, onClose }: Props) => {
  return (
    <Modal className={styles.modalTemplate} onClose={onClose} open disablePortal>
      <Paper elevation={4} className={styles.modalTemplate__wrapper}>
       {title && <h2 className={styles.modalTemplate__title}>{title}</h2>}
        {children}
      </Paper>
    </Modal>
  )
}

export default ModalTemplate