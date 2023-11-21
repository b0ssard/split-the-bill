import React, { useState } from "react";

const Home: React.FC = () => {
  const [totalBill, setTotalBill] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tipPercentage, setTipPercentage] = useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const value = parseFloat(event.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  const calculateTotalWithTip = () =>
    totalBill + (totalBill * tipPercentage) / 100;
  const calculatePerPersonAmount = () =>
    numberOfPeople > 1 ? calculateTotalWithTip() / numberOfPeople : 0;

  return (
    <div>
      <h1>Dividir Conta</h1>
      <div>
        <label>
          Valor da Conta:
          <input
            type="number"
            value={totalBill === 0 ? "" : totalBill}
            onChange={(e) => handleChange(e, setTotalBill)}
            placeholder="Quanto deu a conta?"
          />
        </label>
      </div>
      <div>
        <label>
          Número de Pessoas:
          <input
            type="number"
            value={numberOfPeople === 1 ? "" : numberOfPeople}
            onChange={(e) => handleChange(e, setNumberOfPeople)}
            placeholder="Quantos vão dividir?"
          />
        </label>
      </div>
      <div>
        <label>
          Gorjeta (%):
          <input
            type="number"
            value={tipPercentage === 0 ? "" : tipPercentage}
            onChange={(e) => handleChange(e, setTipPercentage)}
            placeholder="Porcentagem da gorjeta"
          />
        </label>
      </div>
      <div>
        <h2>Resultado</h2>
        <p>Valor Total: R$ {calculateTotalWithTip().toFixed(2)}</p>
        <p>Valor por Pessoa: R$ {calculatePerPersonAmount().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Home;
