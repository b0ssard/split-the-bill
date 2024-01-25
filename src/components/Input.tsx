import React from "react";
import { Input as ChakraInput, FormLabel, FormControl } from "@chakra-ui/react";

export const generateInputConfig = (
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
) => ({
  label,
  value,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    setter(isNaN(inputValue) ? 0 : inputValue);
  },
});

interface InputListProps {
  inputConfigs: {
    label: string;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }[];
}

const CustomInput: React.FC<InputListProps> = ({ inputConfigs }) => (
  <>
    {inputConfigs &&
      inputConfigs.map((config, index) => (
        <FormControl key={index} mb={4}>
          <FormLabel>{config.label}</FormLabel>
          <ChakraInput
            type="number"
            value={config.value || ""}
            onChange={(e) => config.onChange(e)}
            placeholder={config.placeholder}
          />
        </FormControl>
      ))}
  </>
);

export default CustomInput;
