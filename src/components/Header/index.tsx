import { PAGES } from "@/const"
import Link from "next/link"
import styles from './index.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={PAGES.HOME}>Kyomplete Todo</Link>

      <div className={styles.tasksView__header}>
        <Link href={PAGES.NEW_TASK_MODAL}>ADD TASK</Link>
      </div>
      <p>ME</p>
    </header>
  )
}

export default Header