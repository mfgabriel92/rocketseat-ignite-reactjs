import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { query as q } from 'faunadb'
import { stripe } from '@services/stripe'
import { fauna } from '@services/fauna'
import Stripe from 'stripe'

interface User {
  ref: {
    id: string;
  },
  data: {
    stripe_customer_id: string
  }
}

async function getFaunaDbUser(session: Session | null) {
  return await fauna.query<User>(
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(String(session?.user?.email))
      )
    ) 
  )
}

async function createStripeCustomer(session: Session | null) {
  return await stripe.customers.create({
    email: session?.user?.email || '',
  })
}

async function createStripeCheckoutSession(stripeCustomerId: string) {
  return await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      { price: process.env.STRIPE_PRICE_API_ID, quantity: 1 }
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL
  })
}

async function updateFaunaDbUserWithStripeCustomerId(faunaUser: User, stripeCustomer: Stripe.Response<Stripe.Customer>) {
  return await fauna.query(
    q.Update(
      q.Ref(q.Collection('users'), faunaUser.ref.id),
      {
        data: {
          stripe_customer_id: stripeCustomer.id
        }
      }
    )
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }

  const session = await getSession({ req })
  const faunaUser = await getFaunaDbUser(session)

  let stripeCustomerId = faunaUser.data.stripe_customer_id
  if (!stripeCustomerId) {
    const stripeCustomer = await createStripeCustomer(session)
    await updateFaunaDbUserWithStripeCustomerId(faunaUser, stripeCustomer)
    stripeCustomerId = stripeCustomer.id
  }
  
  const stripeCheckoutSession = await createStripeCheckoutSession(stripeCustomerId)
  return res.status(200).json({ sessionId: stripeCheckoutSession.id })
}