import { stripe } from '@services/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { saveSubscription } from './_lib/manage-subscription'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed'
const CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated'
const CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted'
const relevantEvents = new Set([CHECKOUT_SESSION_COMPLETED, CUSTOMER_SUBSCRIPTION_UPDATED, CUSTOMER_SUBSCRIPTION_DELETED])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }

  const buf = await buffer(req)
  const secret = req.headers['stripe-signature'] || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SIGNING_SECRET)
  } catch(err) {
    return res.status(400).send('Webhook error')
  }

  if (!relevantEvents.has(event.type)) {
    return res.json({ message: 'Received' })
  }

  switch (event.type) {
    case CHECKOUT_SESSION_COMPLETED:
      await handleCheckoutSessionCompleted(event)
      break
    case CUSTOMER_SUBSCRIPTION_UPDATED:
    case CUSTOMER_SUBSCRIPTION_DELETED:
      await handleCustomerSubscriptionsChanged(event)
      break
    default:
      throw new Error('Unhandled event')
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const checkoutSession = event.data.object as Stripe.Checkout.Session
  await saveSubscription(
    checkoutSession.subscription?.toString() || '', 
    checkoutSession.customer?.toString() || '',
    true
  )
}

async function handleCustomerSubscriptionsChanged(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  await saveSubscription(
    subscription.id, 
    subscription.customer?.toString() || ''
  )
}