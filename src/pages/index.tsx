import React, { useState, useEffect } from "react";
import { Container, Grid } from "@chakra-ui/react";
import useCalculatorHooks from "@/shared/calculator";
import Header from "@/components/HeaderSection";
import InputSection from "@/components/InputSection";
import SettingsSection from "@/components/SettingsSection";
import translations from "@/shared/translations.json";
import {
  loadInputDataFromLocalStorage,
  saveInputDataToLocalStorage,
  generateInputConfig,
} from "@/shared/functions";

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

  useEffect(() => {
    loadInputDataFromLocalStorage({
      setFoodBill,
      setDrinkBill,
      setTipPercentage,
      setApartBill,
      setPeople,
    });
  }, []);

  useEffect(() => {
    saveInputDataToLocalStorage({
      foodBill,
      drinkBill,
      tipPercentage,
      apartBill,
      People,
    });
  }, [foodBill, drinkBill, tipPercentage, apartBill, People]);

  const onAnimationComplete = () => {
    setIsAnimating(false);
  };

  const toggleLanguage = () => {
    setIsAnimating(true);
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
    <>
      <Header />
      <Container maxW="container.md" mt={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <InputSection
            language={language}
            inputConfigs={inputConfigs}
            onAnimationComplete={onAnimationComplete}
            handleCustomTipChange={handleCustomTipChange}
            setTipPercentage={setTipPercentage}
            isAnimating={isAnimating}
            tipPercentage={tipPercentage}
          />
          <SettingsSection
            language={language}
            toggleLanguage={toggleLanguage}
            onAnimationComplete={onAnimationComplete}
            translations={translations}
            isAnimating={isAnimating}
            selectedCurrency={selectedCurrency}
            handleCurrencyChange={handleCurrencyChange}
            foodAndDrinkTotal={foodAndDrinkTotal}
            apartBill={apartBill}
            tipPercentage={tipPercentage}
            calculateTotalWithTip={calculateTotalWithTip}
            exchangeRates={exchangeRates}
          />
        </Grid>
      </Container>
    </>
  );
}
