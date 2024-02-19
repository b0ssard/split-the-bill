import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { CurrencySectionProps } from "../shared/utils";

const CurrencySection: React.FC<CurrencySectionProps> = ({
  onCurrencyChange,
  renderedTexts,
  currencyOptions,
}) => {
  const { labelText, optionLabel } = renderedTexts;

  return (
    <Box mb={4}>
      <Select
        size="lg"
        variant="filled"
        borderColor={"teal"}
        placeholder={labelText}
        onChange={onCurrencyChange}
      >
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
