import React, { useState, useEffect } from "react";
import { getExchangeRates, ApiResponse } from "@/app/api";
import Input, { generateInputConfig } from "@/app/components/Input";

const Home: React.FC = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
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
      "Pessoas que comeram e beberam:",
      foodAndDrinkPeople,
      setFoodAndDrinkPeople,
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
    foodBill +
    drinkBill +
    (foodBill + drinkBill) * (tipPercentage / 100) -
    apartBill;

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
        {[5, 10, 15].map((tipPercentage) => (
          <button
            key={tipPercentage}
            onClick={() => handleTipButtonClick(tipPercentage)}
          >
            Gorjeta {tipPercentage}%
          </button>
        ))}
      </div>
      <div>
        <label>
          Moeda:
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {[
              { value: "USD", label: "USD - Dólar" },
              { value: "EUR", label: "EUR - Euro" },
              { value: "CAD", label: "CAD - Dólar Canadense" },
            ].map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {exchangeRates && (
        <div>
          <h2>Resultado</h2>
          {[
            ["Valor Total", calculateTotalWithTip],
            ["Valor A Parte", apartBill],
            [
              "Valor para pessoas que comeram e beberam",
              calculateFoodAndDrinkTotal,
            ],
            ["Valor para pessoas que só comeram", foodOnlyTotal],
            ["Valor para pessoas que só beberam", drinkOnlyTotal],
          ].map(([label, value]) => (
            <p key={label}>
              {label}: R$ {Number(value).toFixed(2)} ou {selectedCurrency}{" "}
              {(
                Number(value) * exchangeRates.conversion_rates[selectedCurrency]
              ).toFixed(2)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
