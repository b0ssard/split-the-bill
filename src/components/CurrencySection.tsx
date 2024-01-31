import React from "react";
import { Box, Text, Select } from "@chakra-ui/react";

interface CurrencyOption {
  value: string;
  label: string;
}

interface CurrencySectionProps {
  selectedCurrency: string;
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  renderedTexts: {
    labelText: string;
    optionLabel: string;
  };
  currencyOptions: CurrencyOption[];
}

const CurrencySection: React.FC<CurrencySectionProps> = ({
  selectedCurrency,
  onCurrencyChange,
  renderedTexts,
  currencyOptions,
}) => {
  const { labelText, optionLabel } = renderedTexts;

  return (
    <Box mb={4}>
      <Text>{labelText}:</Text>
      <Select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {optionLabel} {currency.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CurrencySection;
