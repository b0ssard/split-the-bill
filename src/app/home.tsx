import Home from "@/pages";
import { ChakraProvider } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <div>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </div>
  );
}
