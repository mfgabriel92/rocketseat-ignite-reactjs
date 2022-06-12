import { SignInButton } from '@components/SignInButton'
import styles from './styles.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/images/ig-news-logo.svg" alt="ig.news logo" />
        <nav>
          <a className={styles.active} href="/">Home</a>
          <a href="/">Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}

export { Header }