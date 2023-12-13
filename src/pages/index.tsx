import React, { useState, useEffect } from "react";
import { getExchangeRates, ApiResponse } from "@/app/api";
import Input from "@/app/components/Input";

const Home: React.FC = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [foodOnlyPeople, setFoodOnlyPeople] = useState(0);
  const [drinkOnlyPeople, setDrinkOnlyPeople] = useState(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [apartBill, setApartBill] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("BRL");
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

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const customTip = parseFloat(event.target.value);
    setTipPercentage(isNaN(customTip) ? 0 : customTip);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCurrency(event.target.value);
  };

  const handleTipButtonClick = (percentage: number) => {
    setTipPercentage(percentage);
  };

  const generateInputConfig = (
    label: string,
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ): {
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } => ({
    label,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(e, setter),
  });

  const inputConfigs = [
    generateInputConfig("Comida: ", foodBill, setFoodBill),
    generateInputConfig("Bebida: ", drinkBill, setDrinkBill),
    generateInputConfig(
      "Número de Pessoas:",
      numberOfPeople,
      setNumberOfPeople,
    ),
    generateInputConfig(
      "Pessoas que só comeram:",
      foodOnlyPeople,
      setFoodOnlyPeople,
    ),
    generateInputConfig(
      "Pessoas que só beberam:",
      drinkOnlyPeople,
      setDrinkOnlyPeople,
    ),
    generateInputConfig(
      "Pessoas que comeram e beberam:",
      foodAndDrinkPeople,
      setFoodAndDrinkPeople,
    ),
    generateInputConfig("Pagar a parte:", apartBill, setApartBill),
  ];

  const calculateTotalWithTip =
    foodBill + drinkBill + (foodBill + drinkBill) * (tipPercentage / 100);

  const calculateSimplePerPersonAmount =
    numberOfPeople !== 0 ? calculateTotalWithTip / numberOfPeople : 0;

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
      {inputConfigs.map((config, index) => (
        <Input key={index} {...config} />
      ))}
      <div>
        <Input
          label="Gorjeta Personalizada:"
          value={tipPercentage}
          onChange={handleCustomTipChange}
        />
      </div>
      <div>
        <button onClick={() => handleTipButtonClick(5)}>Gorjeta 5%</button>
        <button onClick={() => handleTipButtonClick(10)}>Gorjeta 10%</button>
        <button onClick={() => handleTipButtonClick(15)}>Gorjeta 15%</button>
      </div>
      <div>
        <label>
          Moeda:
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="DOL">USD - Dólar</option>
            <option value="DOL">EUR - Euro</option>
            <option value="DOL">CAD - Dólar Canadense</option>
          </select>
        </label>
      </div>
      {exchangeRates && (
        <div>
          <h2>Resultado</h2>
          <p>
            Valor Total: {selectedCurrency}{" "}
            {(calculateTotalWithTip - apartBill).toFixed(2)} ou USD{" "}
            {(
              (calculateTotalWithTip - apartBill) *
              exchangeRates.conversion_rates.USD
            ).toFixed(2)}
          </p>
          <p>
            Valor A Parte: {selectedCurrency} {apartBill.toFixed(2)}
          </p>
          <p>
            Valor por Pessoa: {selectedCurrency}{" "}
            {(calculateSimplePerPersonAmount - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que só comeram: {selectedCurrency}{" "}
            {(foodOnlyTotal - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que só beberam: {selectedCurrency}{" "}
            {(drinkOnlyTotal - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que comeram e beberam: {selectedCurrency}{" "}
            {(calculateFoodAndDrinkTotal - apartBill).toFixed(2)}
          </p>
        </div>
      )}
      <div>
        <h1>Exchange Rate App</h1>
        {exchangeRates && (
          <div>
            <p>Real to USD: {exchangeRates.conversion_rates.USD}</p>
            <p>Real to EUR: {exchangeRates.conversion_rates.EUR}</p>
            <p>Real to CAD: {exchangeRates.conversion_rates.CAD}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
