import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { formatCurrencyValue, ResultItem, ResultsProps } from "./utils";

const Results: React.FC<ResultsProps> = ({
  calculateTotalWithTip,
  foodAndDrinkTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
  resultLabels,
}) => {
  const conversionRate = exchangeRates?.conversion_rates[selectedCurrency] || 1;

  const resultItems: ResultItem[] = [
    { label: resultLabels[0], value: calculateTotalWithTip },
    { label: resultLabels[1], value: foodAndDrinkTotal },
    { label: resultLabels[2], value: apartBillWithTip },
  ];

  return (
    <Box>
      {resultItems.map(({ label, value }) => (
        <Text key={label} mb={2}>
          {label}:{" "}
          {formatCurrencyValue(value, selectedCurrency, conversionRate)}
        </Text>
      ))}
    </Box>
  );
};

export default Results;
