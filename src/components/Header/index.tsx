import { PAGES } from "@/utils/const"
import Link from "next/link"
import styles from './index.module.scss'
import AddTaskButton from "../AddTaskButton"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={PAGES.HOME}>Kyomplete Todo</Link>

      <div className={styles.tasksView__header}>
        <AddTaskButton />
      </div>
    </header>
  )
}

export default Header