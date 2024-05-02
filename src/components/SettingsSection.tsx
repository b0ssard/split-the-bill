import React from "react";
import { motion } from "framer-motion";
import { Box, Flex, Heading, Divider } from "@chakra-ui/react";
import ColorModeSwitcher from "@/components/ColorModeSwitcher";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";
import Button from "@/components/Button";
import { SettingsSectionProps } from "@/shared/interfaces";

export default function SettingsSection({
  language,
  toggleLanguage,
  onAnimationComplete,
  translations,
  isAnimating,
  selectedCurrency,
  handleCurrencyChange,
  foodAndDrinkTotal,
  apartBill,
  tipPercentage,
  calculateTotalWithTip,
  exchangeRates,
}: SettingsSectionProps) {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Button variant="outline" width="120px" onClick={toggleLanguage}>
          {translations[language].buttonText}
        </Button>
        <ColorModeSwitcher />
      </Flex>
      <Divider my={4} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: isAnimating ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={onAnimationComplete}
      >
        <Heading as="h3" size="lg" mb={4}>
          {translations[language].resultsHeading}
        </Heading>
        <CurrencySection
          selectedCurrency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
          renderedTexts={{
            labelText: translations[language].currencyLabelText,
            optionLabel: translations[language].currencyOptionLabel,
          }}
          currencyOptions={translations[language].currencyOptions}
        />
        <Results
          calculateTotalWithTip={calculateTotalWithTip()}
          foodAndDrinkTotal={foodAndDrinkTotal}
          apartBillWithTip={apartBill + apartBill * (tipPercentage / 100)}
          selectedCurrency={selectedCurrency}
          exchangeRates={exchangeRates}
          resultLabels={translations[language].resultLabels}
        />
      </motion.span>
    </Box>
  );
}
