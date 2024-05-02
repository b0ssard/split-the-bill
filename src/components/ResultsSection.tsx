import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ResultsProps } from "@/shared/interfaces";
import { formatCurrencyValue } from "@/shared/functions";

export default function Results({
  calculateTotalWithTip,
  foodAndDrinkTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
  resultLabels,
}: ResultsProps) {
  const conversionRate = exchangeRates?.conversion_rates[selectedCurrency] || 1;
  const control = useAnimation();

  useEffect(() => {
    control.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 },
    });
  }, [calculateTotalWithTip, foodAndDrinkTotal, apartBillWithTip]);

  const renderResultItems = () => {
    return resultLabels.map((label, index) => (
      <Box key={label} mb={2} display="flex" flexDirection="column">
        <Text>{label}:</Text>
        <motion.div animate={control}>
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
        </motion.div>
      </Box>
    ));
  };

  return <Box>{renderResultItems()}</Box>;
}
