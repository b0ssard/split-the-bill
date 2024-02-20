import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { formatCurrencyValue, ResultItem, ResultsProps } from "../shared/utils";

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
        <Box key={label} mb={2} display="flex" flexDirection="column">
          <Text>{label}:</Text>
          <Text>
            {formatCurrencyValue(value, selectedCurrency, conversionRate)}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Results;
