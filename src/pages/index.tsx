import React, { useState } from "react";

export default function Home() {
  const [totalBill, setTotalBill] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [tipPercentage, setTipPercentage] = useState(0);

  const handleTotalBillChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseFloat(event.target.value);
    setTotalBill(isNaN(value) ? 0 : value);
  };

  const handleNumberOfPeopleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    setNumberOfPeople(isNaN(value) ? 1 : value);
  };

  const handleTipPercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    setTipPercentage(isNaN(value) ? 0 : value);
  };

  const calculateTotalWithTip = () => {
    return totalBill + (totalBill * tipPercentage) / 100;
  };

  const calculatePerPersonAmount = () => {
    return numberOfPeople > 1 ? calculateTotalWithTip() / numberOfPeople : 0;
  };

  return (
    <div>
      <h1>Dividir Conta</h1>
      <div>
        <label>
          Valor da Conta:
          <input
            type="number"
            value={totalBill === 0 ? "" : totalBill}
            onChange={handleTotalBillChange}
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
            onChange={handleNumberOfPeopleChange}
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
            onChange={handleTipPercentageChange}
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
}
