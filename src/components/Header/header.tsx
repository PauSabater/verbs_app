import styles from './header.module.scss'

export default function Header() {
  return (
    <nav className={styles.header}>
        <div className={styles.background}></div>
        <p>THIS IS A HEADER</p>
    </nav>
  )
}