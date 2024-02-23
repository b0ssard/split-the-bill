import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Define o modo de cor inicial como "light"
    useSystemColorMode: false, // Desativa a detecção automática do modo de cor do sistema
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />{" "}
      {/* Script necessário para inicializar o modo de cor */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
