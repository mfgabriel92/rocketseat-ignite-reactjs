import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../contexts/SidebarContext";
import makeServer from "../services/mirage";
import theme from "../styles/theme";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
