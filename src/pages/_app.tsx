import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const theme = extendTheme({
  fonts: {
    body: "sans-serif",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
