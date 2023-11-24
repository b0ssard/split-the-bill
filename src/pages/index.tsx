import React, { useState } from "react";

interface InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
  <input
    type="number"
    step=",01"
    value={value === null || value === undefined ? "" : value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const Home: React.FC = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [foodOnlyPeople, setFoodOnlyPeople] = useState(0);
  const [drinkOnlyPeople, setDrinkOnlyPeople] = useState(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [apartBill, setApartBill] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value);
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

  return (
    <div>
      <h1>Dividir Conta</h1>
      <div>
        <label>
          Comida:
          <Input
            value={foodBill}
            onChange={(e) => handleChange(e, setFoodBill)}
          />
        </label>
      </div>
      <div>
        <label>
          Bebida:
          <Input
            value={drinkBill}
            onChange={(e) => handleChange(e, setDrinkBill)}
          />
        </label>
      </div>
      <div>
        <label>
          Número de Pessoas:
          <Input
            value={numberOfPeople}
            onChange={(e) => handleChange(e, setNumberOfPeople)}
          />
        </label>
      </div>
      <div>
        <label>
          Pessoas que só comeram:
          <Input
            value={foodOnlyPeople}
            onChange={(e) => handleChange(e, setFoodOnlyPeople)}
          />
        </label>
      </div>
      <div>
        <label>
          Pessoas que só beberam:
          <Input
            value={drinkOnlyPeople}
            onChange={(e) => handleChange(e, setDrinkOnlyPeople)}
          />
        </label>
      </div>
      <div>
        <label>
          Pessoas que comeram e beberam:
          <Input
            value={foodAndDrinkPeople}
            onChange={(e) => handleChange(e, setFoodAndDrinkPeople)}
          />
        </label>
      </div>
      <div>
        <label>
          Pagar a parte:
          <Input
            value={apartBill}
            onChange={(e) => handleChange(e, setApartBill)}
          />
        </label>
      </div>
      <div>
        <label>
          Gorjeta (%):
          <Input
            value={tipPercentage}
            onChange={(e) => handleChange(e, setTipPercentage)}
          />
        </label>
        <button onClick={() => setShowResults(true)}>Mostrar Resultados</button>
      </div>
      {showResults && (
        <div>
          <h2>Resultado</h2>
          <p>Valor Total: R${(calculateTotalWithTip - apartBill).toFixed(2)}</p>
          <p>
            Valor por Pessoa: R${" "}
            {(calculateSimplePerPersonAmount - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que só comeram: R${" "}
            {(foodOnlyTotal - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que só beberam: R${" "}
            {(drinkOnlyTotal - apartBill).toFixed(2)}
          </p>
          <p>
            Valor para pessoas que comeram e beberam: R${" "}
            {(calculateFoodAndDrinkTotal - apartBill).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
