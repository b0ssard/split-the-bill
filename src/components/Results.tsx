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
  exchangeRates: { conversion_rates },
}) => {
  const resultItems: ResultItem[] = [
    { label: "Valor Total a ser dividido", value: calculateTotalWithTip },
    {
      label: "Valor para pessoas que comeram e beberam",
      value: calculateFoodAndDrinkTotal,
    },
    { label: "Valor para pessoas que só comeram", value: foodOnlyTotal },
    { label: "Valor para pessoas que só beberam", value: drinkOnlyTotal },
    { label: "Valor A Parte", value: apartBillWithTip },
  ];

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Resultado
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
