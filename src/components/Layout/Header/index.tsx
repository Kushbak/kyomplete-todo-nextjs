import { PAGES } from "@/const"
import Link from "next/link"
import styles from './index.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={PAGES.HOME}>Kyomplete Todo</Link>
      <p>ME</p>
    </header>
  )
}

export default Header