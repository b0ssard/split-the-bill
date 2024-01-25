import { useState, useEffect } from "react";
import { getExchangeRates, ApiResponse } from "@/app/api";
import Input, { generateInputConfig } from "@/components/Input";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/Currency";
import Results from "@/components/Results";

const Home: React.FC = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [foodOnlyPeople, setFoodOnlyPeople] = useState(0);
  const [drinkOnlyPeople, setDrinkOnlyPeople] = useState(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [apartBill, setApartBill] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rates = await getExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };

    fetchData();
  }, []);

  const inputConfigs = [
    generateInputConfig("Comida: ", foodBill, setFoodBill),
    generateInputConfig("Bebida: ", drinkBill, setDrinkBill),
    generateInputConfig(
      "Pessoas que comeram e beberam: ",
      foodAndDrinkPeople,
      setFoodAndDrinkPeople,
    ),
    generateInputConfig(
      "Pessoas que só comeram: ",
      foodOnlyPeople,
      setFoodOnlyPeople,
    ),
    generateInputConfig(
      "Pessoas que só beberam: ",
      drinkOnlyPeople,
      setDrinkOnlyPeople,
    ),
    generateInputConfig("Pagar a parte: ", apartBill, setApartBill),
  ];

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCurrency(event.target.value);
  };

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const customTip = parseFloat(event.target.value);
    setTipPercentage(isNaN(customTip) ? 0 : customTip);
  };

  const apartBillWithTip = apartBill + apartBill * (tipPercentage / 100);

  const calculateTotalWithTip =
    foodBill +
    drinkBill +
    (foodBill + drinkBill) * (tipPercentage / 100) -
    apartBillWithTip;

  const foodOnlyTotal =
    foodOnlyPeople !== 0
      ? (foodBill + foodBill * (tipPercentage / 100)) /
        (foodOnlyPeople + foodAndDrinkPeople)
      : 0;

  const drinkOnlyTotal =
    drinkOnlyPeople !== 0
      ? (drinkBill + drinkBill * (tipPercentage / 100)) /
        (drinkOnlyPeople + foodAndDrinkPeople)
      : 0;

  const calculateFoodAndDrinkTotal =
    foodAndDrinkPeople !== 0
      ? (calculateTotalWithTip -
          (foodOnlyTotal * foodOnlyPeople + drinkOnlyTotal * drinkOnlyPeople)) /
        foodAndDrinkPeople
      : 0;

  return (
    <div>
      <h1>Dividir Conta</h1>
      <Input inputConfigs={inputConfigs} />
      <TipSection
        tipPercentage={tipPercentage}
        onCustomTipChange={handleCustomTipChange}
        onTipButtonClick={(percentage) => setTipPercentage(percentage)}
      />
      <CurrencySection
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      {exchangeRates && (
        <Results
          calculateTotalWithTip={calculateTotalWithTip}
          calculateFoodAndDrinkTotal={calculateFoodAndDrinkTotal}
          foodOnlyTotal={foodOnlyTotal}
          drinkOnlyTotal={drinkOnlyTotal}
          apartBillWithTip={apartBillWithTip}
          selectedCurrency={selectedCurrency}
          exchangeRates={exchangeRates}
        />
      )}
    </div>
  );
};

export default Home;
