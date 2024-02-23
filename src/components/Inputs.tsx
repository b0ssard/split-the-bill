import { Box, Text, Input as ChakraInput } from "@chakra-ui/react";
import { InputListProps, InputConfig } from "../shared/utils";

export default function Input({ inputConfigs }: InputListProps) {
  return (
    <Box>
      {inputConfigs &&
        inputConfigs.map((config, index) => (
          <InputField key={index} config={config} />
        ))}
    </Box>
  );
}

function InputField({ config }: { config: InputConfig }) {
  return (
    <Box mb={4}>
      <Text>{config.label}</Text>
      <ChakraInput
        type="number"
        value={config.value || ""}
        onChange={(e) => config.onChange(e)}
        placeholder={config.placeholder}
        sx={{ boxShadow: "0.5px 0.5px rgba(0,0,0,0.1)" }}
      />
    </Box>
  );
}
