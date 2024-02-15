import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ResultItem, ResultsProps } from "./types";

const formatCurrencyValue = (
  value: number,
  selectedCurrency: string,
  conversionRate: number,
): string => {
  const formattedValueConverted = (value * conversionRate).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: selectedCurrency,
    },
  );
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `${formattedValue} ou ${formattedValueConverted}`;
};

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
