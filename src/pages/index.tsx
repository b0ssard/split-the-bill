import React, { useState, useEffect } from "react";
import { getExchangeRates, ApiResponse } from "@/app/api";
import Input, { generateInputConfig } from "@/app/components/Input";

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

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const customTip = parseFloat(event.target.value);
    setTipPercentage(isNaN(customTip) ? 0 : customTip);
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCurrency(event.target.value);
  };

  const handleTipButtonClick = (percentage: number) => {
    setTipPercentage(percentage);
  };

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

  const calculate = (type: string) => {
    switch (type) {
      case "valortotal":
        return calculateTotalWithTip - apartBill;
      case "valoraparte":
        return apartBill;
      case "valorporpessoa":
        return calculateSimplePerPersonAmount - apartBill;
      case "valorpessoascomeram":
        return foodOnlyTotal - apartBill;
      case "valorpessoasbeberam":
        return drinkOnlyTotal - apartBill;
      case "valorpessoascomerambeberam":
        return calculateFoodAndDrinkTotal - apartBill;
      default:
        return 0;
    }
  };

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
            <option value="EUR">EUR - Euro</option>
            <option value="CAD">CAD - Dólar Canadense</option>
          </select>
        </label>
      </div>
      {exchangeRates && (
        <div>
          <h2>Resultado</h2>
          {[
            "Valor total",
            "Valor a parte",
            "Valor por pessoa",
            "Valor para pessoas que só comeram",
            "Valor para pessoas que só beberam",
            "Valor para pessoas que comeram e beberam",
          ].map((label, index) => (
            <p key={index}>
              {label}: {selectedCurrency} {calculate(label)?.toFixed(2)} ou USD{" "}
              {(calculate(label) * exchangeRates.conversion_rates.USD).toFixed(
                2,
              )}
            </p>
          ))}
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
