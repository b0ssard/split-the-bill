import { Box, Select } from "@chakra-ui/react";
import { CurrencySectionProps } from "@/shared/interfaces";

export default function CurrencySection({
  onCurrencyChange,
  renderedTexts,
  currencyOptions,
}: CurrencySectionProps) {
  const { labelText, optionLabel } = renderedTexts;

  return (
    <Box mb={4}>
      <Select
        size="lg"
        variant="filled"
        borderColor={"teal"}
        placeholder={labelText}
        onChange={onCurrencyChange}
        sx={{ boxShadow: "0 4px 4px rgba(0,0,0,0.1)" }}
      >
        {currencyOptions.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {optionLabel} {currency.label}
          </option>
        ))}
      </Select>
    </Box>
  );
}
