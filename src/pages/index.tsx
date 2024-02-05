import React from "react";
import useCalculatorHooks from "@/hooks/calculator";
import { Box, Heading, Container, Grid, Divider } from "@chakra-ui/react";
import Input from "@/components/Inputs";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";

const Home: React.FC = () => {
  const {
    foodBill,
    drinkBill,
    foodOnlyPeople,
    drinkOnlyPeople,
    foodAndDrinkPeople,
    tipPercentage,
    setTipPercentage,
    apartBill,
    selectedCurrency,
    exchangeRates,
    inputConfigs,
    handleCurrencyChange,
    handleCustomTipChange,
    calculateTotalWithTip,
    calculateCategoryTotal,
  } = useCalculatorHooks();

  const foodOnlyTotal = calculateCategoryTotal(foodBill, foodOnlyPeople);
  const drinkOnlyTotal = calculateCategoryTotal(drinkBill, drinkOnlyPeople);
  const calculateFoodAndDrinkTotal = calculateCategoryTotal(
    calculateTotalWithTip(),
    foodAndDrinkPeople,
  );

  const resultLabels = [
    "Valor Total a ser dividido",
    "Valor para pessoas que comeram e beberam",
    "Valor para pessoas que só comeram",
    "Valor para pessoas que só beberam",
    "Valor A Parte",
  ];

  const customCurrencyOptions = [
    { value: "USD", label: "USD - Dólar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "CAD", label: "CAD - Dólar Canadense" },
  ];

  return (
    <Container maxW="container.md" mt={8}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Heading as="h1" mb={4}>
            Calculator App
          </Heading>
          <Input inputConfigs={inputConfigs} />
          <TipSection
            label="Gorjeta:"
            tipPercentage={tipPercentage}
            onCustomTipChange={handleCustomTipChange}
            onTipButtonClick={(percentage) => setTipPercentage(percentage)}
          />
          <CurrencySection
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            renderedTexts={{
              labelText: "Moeda",
              optionLabel: "Selecionar",
            }}
            currencyOptions={customCurrencyOptions}
          />
        </Box>
        <Box>
          <Divider my={4} />
          <Results
            heading="Resultado:"
            ou=" ou "
            calculateTotalWithTip={calculateTotalWithTip()}
            calculateFoodAndDrinkTotal={calculateFoodAndDrinkTotal}
            foodOnlyTotal={foodOnlyTotal}
            drinkOnlyTotal={drinkOnlyTotal}
            apartBillWithTip={apartBill + apartBill * (tipPercentage / 100)}
            selectedCurrency={selectedCurrency}
            exchangeRates={exchangeRates}
            resultLabels={resultLabels}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
