import React from "react";

interface ExchangeRates {
  conversion_rates: {
    [key: string]: number;
  };
}

interface ResultItem {
  label: string;
  value: number;
}

interface ResultsProps {
  calculateTotalWithTip: number;
  calculateFoodAndDrinkTotal: number;
  foodOnlyTotal: number;
  drinkOnlyTotal: number;
  apartBillWithTip: number;
  selectedCurrency: string;
  exchangeRates: ExchangeRates;
}

const Results: React.FC<ResultsProps> = ({
  calculateTotalWithTip,
  calculateFoodAndDrinkTotal,
  foodOnlyTotal,
  drinkOnlyTotal,
  apartBillWithTip,
  selectedCurrency,
  exchangeRates,
}) => {
  const resultItems: ResultItem[] = [
    { label: "Valor Total a ser dividido", value: calculateTotalWithTip },
    {
      label: "Valor para pessoas que comeram e beberam",
      value: calculateFoodAndDrinkTotal,
    },
    { label: "Valor para pessoas que só comeram", value: foodOnlyTotal },
    { label: "Valor para pessoas que só beberam", value: drinkOnlyTotal },
    { label: "Valor A Parte", value: apartBillWithTip },
  ];

  return (
    <div>
      <h2>Resultado</h2>
      {resultItems.map(({ label, value }) => (
        <p key={label}>
          {label}: R$ {value.toFixed(2)} ou {selectedCurrency}{" "}
          {(value * exchangeRates.conversion_rates[selectedCurrency]).toFixed(
            2,
          )}
        </p>
      ))}
    </div>
  );
};

export default Results;
