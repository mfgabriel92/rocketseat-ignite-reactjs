import ActiveLink from '@components/ActiveLink'
import SignInButton from '@components/SignInButton'
import styles from './styles.module.scss'

function Header() {
  

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/images/ig-news-logo.svg" alt="ig.news logo" />
        <nav>
          <ActiveLink activeClass={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClass={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}

export default Header