import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

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
  calculateFoodAndDrinkTotal: number;
  foodOnlyTotal: number;
  drinkOnlyTotal: number;
  apartBillWithTip: number;
  selectedCurrency: string;
  exchangeRates: ExchangeRates;
  heading: string;
  resultLabels: string[];
}

const formatCurrencyValue = (
  value: number,
  selectedCurrency: string,
  conversionRate: number,
): string => {
  const formattedValue = (value * conversionRate).toFixed(2);
  return `R$ ${formattedValue} ou ${selectedCurrency} ${formattedValue}`;
};

const Results: React.FC<ResultsProps> = ({
  calculateTotalWithTip,
  calculateFoodAndDrinkTotal,
  foodOnlyTotal,
  drinkOnlyTotal,
  apartBillWithTip,
  selectedCurrency,
  heading,
  exchangeRates: { conversion_rates },
  resultLabels,
}) => {
  const resultItems: ResultItem[] = [
    { label: resultLabels[0], value: calculateTotalWithTip },
    { label: resultLabels[1], value: calculateFoodAndDrinkTotal },
    { label: resultLabels[2], value: foodOnlyTotal },
    { label: resultLabels[3], value: drinkOnlyTotal },
    { label: resultLabels[4], value: apartBillWithTip },
  ];

  return (
    <Box>
      <Heading as="h2" mb={4}>
        {heading}
      </Heading>
      {resultItems.map(({ label, value }) => (
        <Text key={label} mb={2}>
          {label}:{" "}
          {formatCurrencyValue(
            value,
            selectedCurrency,
            conversion_rates[selectedCurrency],
          )}
        </Text>
      ))}
    </Box>
  );
};

export default Results;
