import React, { useState } from "react";
import useCalculatorHooks from "@/shared/calculator";
import {
  Box,
  Heading,
  Container,
  Grid,
  Divider,
  Button,
} from "@chakra-ui/react";
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

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "portuguese" : "english",
    );
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
          <Heading as="h1" mb={4}>
            SPL / IT.
          </Heading>
          <Input inputConfigs={inputConfigs} />
          <TipSection
            tipLabel={translations[language].tipLabel}
            tipPercentage={tipPercentage}
            onCustomTipChange={handleCustomTipChange}
            onTipButtonClick={(percentage) => setTipPercentage(percentage)}
          />
          <Button mt={4} onClick={toggleLanguage}>
            {translations[language].buttonText}
          </Button>
        </Box>
        <Box>
          <Divider my={4} />
          <Heading as="h2" mb={4}>
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
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
