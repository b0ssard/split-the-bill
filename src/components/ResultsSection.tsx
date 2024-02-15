import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface ExchangeRates {
  conversion_rates: {
    [key: string]: number;
  };
}

interface ResultItem {
  label: string;
  value: number;
}

interface ResultsProps {
  calculateTotalWithTip: number;
  foodAndDrinkTotal: number;
  apartBillWithTip: number;
  selectedCurrency: string;
  exchangeRates: ExchangeRates | null;
  resultLabels: string[];
}

const formatCurrencyValue = (
  value: number,
  selectedCurrency: string,
  conversionRate: number,
): string => {
  const formattedValueConverted = (value * conversionRate).toFixed(2);
  const formattedValue = value.toFixed(2);
  return `R$ ${formattedValue} ou ${selectedCurrency} ${formattedValueConverted}`;
};

const Results: React.FC<ResultsProps> = ({
  calculateTotalWithTip,
  foodAndDrinkTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
  resultLabels,
}) => {
  if (!exchangeRates || !exchangeRates.conversion_rates) {
    return <div>Carregando...</div>;
  }

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
          {formatCurrencyValue(
            value,
            selectedCurrency,
            exchangeRates.conversion_rates[selectedCurrency],
          )}
        </Text>
      ))}
    </Box>
  );
};

export default Results;
