import React from "react";
import { Box, Text, Input as ChakraInput } from "@chakra-ui/react";

export const generateInputConfig = (
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
) => {
  return {
    label,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseFloat(e.target.value);
      setter(isNaN(inputValue) ? 0 : inputValue);
    },
  };
};

export interface InputConfig {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface InputListProps {
  inputConfigs: InputConfig[];
}

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
