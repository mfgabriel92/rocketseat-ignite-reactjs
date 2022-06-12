import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

function SignInButton() {
  const isUserLoggedIn = true

  return (
    <button className={styles.button}>
      <FaGithub className={isUserLoggedIn ? styles.loggedIn : styles.loggedOut} />
      {
        isUserLoggedIn
          ? <><span>Welcome, @mfgabriel92</span> <FiX /></>
          : <span>Sign-in with Github</span>
      }
    </button>
  )
}

export { SignInButton }