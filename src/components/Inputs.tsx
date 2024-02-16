import React from "react";
import { Box, Text, Input as ChakraInput } from "@chakra-ui/react";
import { InputListProps } from "../shared/utils";

const Input: React.FC<InputListProps> = ({ inputConfigs }) => (
  <Box>
    {inputConfigs &&
      inputConfigs.map((config, index) => (
        <Box key={index} mb={4}>
          <Text>{config.label}</Text>
          <ChakraInput
            type="number"
            value={config.value || ""}
            onChange={(e) => config.onChange(e)}
            placeholder={config.placeholder}
          />
        </Box>
      ))}
  </Box>
);

export default Input;
