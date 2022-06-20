import { useSession, signIn } from 'next-auth/react'
import { api } from '@services/api'
import { getStripeJs } from '@services/stripe-js'
import styles from './styles.module.scss'

export default function SubscribeButton() {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const { data: { sessionId }} = await api.post('/subscribe')
      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <button type="button" className={styles.button} onClick={handleSubscribe}>Subscribe now</button>
  )
}