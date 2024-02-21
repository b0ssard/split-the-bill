import { Box, Text } from "@chakra-ui/react";
import { formatCurrencyValue, ResultsProps } from "@/shared/utils";

export default function Results({
  calculateTotalWithTip,
  foodAndDrinkTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
  resultLabels,
}: ResultsProps) {
  const conversionRate = exchangeRates?.conversion_rates[selectedCurrency] || 1;

  const renderResultItems = () => {
    return resultLabels.map((label, index) => (
      <Box key={label} mb={2} display="flex" flexDirection="column">
        <Text>{label}:</Text>
        <Text>
          {formatCurrencyValue(
            index === 0
              ? calculateTotalWithTip
              : index === 1
              ? foodAndDrinkTotal
              : apartBillWithTip,
            selectedCurrency,
            conversionRate,
          )}
        </Text>
      </Box>
    ));
  };

  return <Box>{renderResultItems()}</Box>;
}
