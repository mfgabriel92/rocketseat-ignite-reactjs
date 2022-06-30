import Header from '@components/Header'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../styles/global.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp