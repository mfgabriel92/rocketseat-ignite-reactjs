import { query as q } from 'faunadb'
import Stripe from 'stripe'
import { fauna } from '@services/fauna'
import { stripe } from '@services/stripe'
import { IgError } from 'utils/ig-error'

export async function saveSubscription(subscriptionId: string, customerId: string, createAction = false) {
  try {
    const userRef = await getFaunaUserRef(customerId)
    const subscription = await getStripeSubscription(subscriptionId)
    await persistSubscription(subscription, userRef, createAction)
  } catch (error) {
    const e = error as IgError
    console.log('Persistance error: ', e.description)
  }
}

async function getFaunaUserRef(customerId: string) {
  return await fauna.query(
    q.Select(
      'ref',
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )
}

async function getStripeSubscription(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId)
}

async function persistSubscription(subscription: Stripe.Response<Stripe.Subscription>, userRef: object, createAction: boolean) {
  const data = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if (createAction) {
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data }
      )
    )
    return
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match('subscription_by_id'),
            subscription.id
          )
        ),
        { data }
      )
    )
  }
}
