import { PAGES } from "@/utils/const"
import Link from "next/link"
import styles from './index.module.scss'
import AddTaskButton from "../AddTaskButton"
import CreateUserBtn from "../CreateUserBtn"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={PAGES.HOME}>Kyomplete Todo</Link>

      <div className={styles.header__btns}>
        <CreateUserBtn />
        <AddTaskButton />
      </div>
    </header>
  )
}

export default Header