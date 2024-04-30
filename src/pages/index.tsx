import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Flex, Heading, Container, Grid, Divider } from "@chakra-ui/react";
import useCalculatorHooks from "@/shared/calculator";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";
import Button from "@/components/Button";
import Input from "@/components/Inputs";
import Header from "@/components/HeaderSection";
import ColorModeSwitcher from "@/components/ColorModeSwitcher";
import translations from "@/shared/translations.json";
import { generateInputConfig } from "@/shared/utils";

export default function Home() {
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

  const [language, setLanguage] = useState<"english" | "portuguese">(
    "portuguese",
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (
      savedLanguage &&
      (savedLanguage === "english" || savedLanguage === "portuguese")
    ) {
      setLanguage(savedLanguage as "english" | "portuguese");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const loadInputDataFromLocalStorage = () => {
    const savedFoodBill = localStorage.getItem("foodBill");
    if (savedFoodBill) {
      setFoodBill(parseFloat(savedFoodBill));
    }
    const savedDrinkBill = localStorage.getItem("drinkBill");
    if (savedDrinkBill) {
      setDrinkBill(parseFloat(savedDrinkBill));
    }
    const savedTipPercentage = localStorage.getItem("tipPercentage");
    if (savedTipPercentage) {
      setTipPercentage(parseFloat(savedTipPercentage));
    }
    const savedApartBill = localStorage.getItem("apartBill");
    if (savedApartBill) {
      setApartBill(parseFloat(savedApartBill));
    }
    const savedPeople = localStorage.getItem("People");
    if (savedPeople) {
      setPeople(parseFloat(savedPeople));
    }
  };

  useEffect(() => {
    loadInputDataFromLocalStorage();
  }, []);

  const saveInputDataToLocalStorage = () => {
    localStorage.setItem("foodBill", foodBill.toString());
    localStorage.setItem("drinkBill", drinkBill.toString());
    localStorage.setItem("tipPercentage", tipPercentage.toString());
    localStorage.setItem("apartBill", apartBill.toString());
    localStorage.setItem("People", People.toString());
  };

  useEffect(() => {
    saveInputDataToLocalStorage();
  }, [foodBill, drinkBill, tipPercentage, apartBill, People]);

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
    <>
      <Header />
      <Container maxW="container.md" mt={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <Box>
            <Heading
              as="h1"
              size="3xl"
              mb={4}
              fontFamily="sans-serif"
              fontWeight="bold"
            >
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
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
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
        </Grid>
      </Container>
    </>
  );
}
