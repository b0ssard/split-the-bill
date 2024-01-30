import React from "react";
import { Box, Text, Select } from "@chakra-ui/react";

interface CurrencyOption {
  value: string;
  label: string;
}

interface CurrencySectionProps {
  selectedCurrency: string;
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const currencyOptions: CurrencyOption[] = [
  { value: "USD", label: "USD - Dólar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "CAD", label: "CAD - Dólar Canadense" },
];

const CurrencySection: React.FC<CurrencySectionProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <Box mb={4}>
      <Text>Moeda:</Text>
      <Select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CurrencySection;
