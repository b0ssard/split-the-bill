import React, { useState } from "react";
import { motion } from "framer-motion";
import useCalculatorHooks from "@/shared/calculator";
import Button from "@/components/Button";
import { Box, Heading, Container, Grid, Divider } from "@chakra-ui/react";
import Input from "@/components/Inputs";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";
import { generateInputConfig } from "@/shared/utils";
import translations from "@/shared/translations.json";

const Home: React.FC = () => {
  const {
    foodBill,
    setFoodBill,
    drinkBill,
    setDrinkBill,
    tipPercentage,
    setTipPercentage,
    apartBill,
    setApartBill,
    People,
    setPeople,
    selectedCurrency,
    exchangeRates,
    handleCurrencyChange,
    handleCustomTipChange,
    calculateTotalWithTip,
    calculateCategoryTotal,
  } = useCalculatorHooks();

  const [language, setLanguage] = useState<"english" | "portuguese">("english");
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLanguage = () => {
    setIsAnimating(true);
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "portuguese" : "english",
    );
  };

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  const inputConfigs = [
    generateInputConfig(
      translations[language].foodLabel,
      foodBill,
      setFoodBill,
    ),
    generateInputConfig(
      translations[language].drinkLabel,
      drinkBill,
      setDrinkBill,
    ),
    generateInputConfig(translations[language].peopleLabel, People, setPeople),
    generateInputConfig(
      translations[language].apartLabel,
      apartBill,
      setApartBill,
    ),
  ];

  const foodAndDrinkTotal = calculateCategoryTotal(foodBill + drinkBill);

  return (
    <Container maxW="container.md" mt={8}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Heading as="h1" size="3xl" mb={4} fontFamily="sans-serif">
            SPL / IT.
          </Heading>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: isAnimating ? 0 : 5,
            }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={onAnimationComplete}
          >
            <Input inputConfigs={inputConfigs} />

            <TipSection
              tipLabel={translations[language].tipLabel}
              tipPercentage={tipPercentage}
              onCustomTipChange={handleCustomTipChange}
              onTipButtonClick={(percentage) => setTipPercentage(percentage)}
            />
          </motion.span>
        </Box>
        <Box>
          <Button variant="outline" width="120px" onClick={toggleLanguage}>
            {translations[language].buttonText}
          </Button>
          <Divider my={4} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: isAnimating ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={onAnimationComplete}
          >
            <Heading as="h3" size="lg" mb={4} fontFamily="sans-serif">
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
      </Grid>
    </Container>
  );
};

export default Home;
