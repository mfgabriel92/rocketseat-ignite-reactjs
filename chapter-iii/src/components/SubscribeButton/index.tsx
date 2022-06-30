import { api } from '@services/api'
import { getStripeJs } from '@services/stripe-js'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

function SubscribeButton() {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    if (session.isSubscriptionActive) {
      router.push('/posts')
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

export default SubscribeButton