import { Button as ChakraButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CustomButtonProps } from "@/shared/interfaces";

export default function Button({
  children,
  onClick,
  ...rest
}: CustomButtonProps) {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <ChakraButton
        colorScheme="teal"
        mt={4}
        size="md"
        height="40px"
        transition="background-color 0.3s"
        _hover={{ backgroundColor: "blue.400" }}
        onClick={onClick}
        sx={{ boxShadow: "0 4px 4px rgba(0,0,0,0.1)" }}
        {...rest}
      >
        {children}
      </ChakraButton>
    </motion.div>
  );
}
