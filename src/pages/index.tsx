import React, { useState } from "react";

interface InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
  <input
    type="number"
    value={value === null || value === undefined ? "" : value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const Home: React.FC = () => {
  const [foodBill, setFoodBill] = useState<number>(0);
  const [drinkBill, setDrinkBill] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [foodOnlyPeople, setFoodOnlyPeople] = useState<number>(0);
  const [drinkOnlyPeople, setDrinkOnlyPeople] = useState<number>(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  const calculateTotalWithTip =
    foodBill + drinkBill + (foodBill + drinkBill) * (tipPercentage / 100);

  const calculateSimplePerPersonAmount = () =>
    calculateTotalWithTip / numberOfPeople;

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
    (calculateTotalWithTip -
      (foodOnlyTotal * foodOnlyPeople + drinkOnlyTotal * drinkOnlyPeople)) /
    foodAndDrinkPeople;

  return (
    <div>
      <h1>Dividir Conta</h1>
      <div>
        <label>
          Comida:
          <Input
            value={foodBill}
            onChange={(e) => handleChange(e, setFoodBill)}
            placeholder="Valor da comida"
          />
        </label>
      </div>
      <div>
        <label>
          Bebida:
          <Input
            value={drinkBill}
            onChange={(e) => handleChange(e, setDrinkBill)}
            placeholder="Valor da bebida"
          />
        </label>
      </div>
      <div>
        <label>
          Número de Pessoas:
          <Input
            value={numberOfPeople}
            onChange={(e) => handleChange(e, setNumberOfPeople)}
            placeholder="Quantos vão dividir?"
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
          Gorjeta (%):
          <Input
            value={tipPercentage}
            onChange={(e) => handleChange(e, setTipPercentage)}
            placeholder="Porcentagem da gorjeta"
          />
        </label>
      </div>
      <div>
        <h2>Resultado</h2>
        <p>Valor Total: R$ {calculateTotalWithTip.toFixed(2)}</p>
        <p>
          Valor por Pessoa: R$ {calculateSimplePerPersonAmount().toFixed(2)}
        </p>
        <p>Valor para pessoas que só comeram: R$ {foodOnlyTotal.toFixed(2)}</p>
        <p>Valor para pessoas que só beberam: R$ {drinkOnlyTotal.toFixed(2)}</p>
        <p>
          Valor para pessoas que comeram e beberam: R${" "}
          {calculateFoodAndDrinkTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Home;
