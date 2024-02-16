import React from "react";
import useCalculatorHooks from "@/hooks/calculator";
import { Box, Heading, Container, Grid, Divider } from "@chakra-ui/react";
import Input from "@/components/Inputs";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";
import { generateInputConfig } from "@/components/types";

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

  const inputConfigs = [
    generateInputConfig("Comida: ", foodBill, setFoodBill),
    generateInputConfig("Bebida: ", drinkBill, setDrinkBill),
    generateInputConfig("Pessoas: ", People, setPeople),
    generateInputConfig("Pagar a parte: ", apartBill, setApartBill),
  ];

  const foodAndDrinkTotal = calculateCategoryTotal(foodBill + drinkBill);

  const resultLabels = ["Valor A Parte", "Valor Final", "Valor Por Pessoa"];

  return (
    <Container maxW="container.md" mt={8}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <Heading as="h1" mb={4}>
            SPL / IT.
          </Heading>
          <Input inputConfigs={inputConfigs} />
          <TipSection
            tipLabel="Gorjeta"
            tipPercentage={tipPercentage}
            onCustomTipChange={handleCustomTipChange}
            onTipButtonClick={(percentage) => setTipPercentage(percentage)}
          />
        </Box>
        <Box>
          <Divider my={4} />
          <Heading as="h2" mb={4}>
            Resultados
          </Heading>
          <CurrencySection
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            renderedTexts={{
              labelText: "Converter para:",
              optionLabel: "Selecionar",
            }}
            currencyOptions={[
              { value: "USD", label: "USD - Dólar" },
              { value: "EUR", label: "EUR - Euro" },
              { value: "CAD", label: "CAD - Dólar Canadense" },
            ]}
          />
          <Results
            calculateTotalWithTip={calculateTotalWithTip()}
            foodAndDrinkTotal={foodAndDrinkTotal}
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
