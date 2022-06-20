import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './styles.module.scss'

function SignInButton() {
  const { data: session } = useSession()

  return session 
    ? (
      <button className={styles.button}>
        <FaGithub className={styles.loggedIn} />
        Welcome, @{session.user?.name} <FiX onClick={() => signOut()} />
      </button>
    ) 
    : (
      <button className={styles.button} onClick={() => signIn('github')}>
        <FaGithub className={styles.loggedOut} />
        Sign-in with Github
      </button>
    )
}

export { SignInButton }