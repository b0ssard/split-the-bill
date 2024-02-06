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
  exchangeRates: ExchangeRates | null;
  heading: string;
  resultLabels: string[];
  ou: string;
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
  calculateFoodAndDrinkTotal,
  foodOnlyTotal,
  drinkOnlyTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
  heading,
  resultLabels,
}) => {
  if (!exchangeRates || !exchangeRates.conversion_rates) {
    return <div>Carregando...</div>;
  }

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
            exchangeRates.conversion_rates[selectedCurrency],
          )}
        </Text>
      ))}
    </Box>
  );
};

export default Results;
