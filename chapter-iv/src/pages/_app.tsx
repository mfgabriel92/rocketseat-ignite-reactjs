import { ChakraProvider } from '@chakra-ui/react' 
import type { AppProps } from 'next/app'
import { SidebarProvider } from '../contexts/SidebarContext'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  )
}

export default MyApp
