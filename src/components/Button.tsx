import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  width: string;
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <ChakraButton
      colorScheme="teal"
      mt={4}
      size="md"
      height="40px"
      transition="background-color 0.3s"
      _hover={{ backgroundColor: "blue.400" }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
