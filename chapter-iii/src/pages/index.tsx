import SubscribeButton from '@components/SubscribeButton'
import styles from '@styles/home.module.scss'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { stripe } from 'services/stripe'

interface HomeProps {
  product: {
    priceId: string,
    price: number
  }
}

function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br /> <span>for {product.price}/month</span></p>
          <SubscribeButton />
        </section>
        <img src="/images/coder-girl.svg" alt="Coder girl" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { id, unit_amount } = await stripe.prices.retrieve(process.env.STRIPE_PRICE_API_ID)

  const product = {
    priceId: id,
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((unit_amount || 0) / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default Home