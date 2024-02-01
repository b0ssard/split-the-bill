import React from "react";
import useCalculatorHooks from "@/hooks/calculator";
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

  const renderedTexts = {
    labelText: "Moeda",
    optionLabel: "Selecionar",
  };

  const customCurrencyOptions = [
    { value: "USD", label: "USD - Dólar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "CAD", label: "CAD - Dólar Canadense" },
  ];

  return (
    <div>
      <h1>Calculator App</h1>
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
        renderedTexts={renderedTexts}
        currencyOptions={customCurrencyOptions}
      />
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
    </div>
  );
};

export default Home;
