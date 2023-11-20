import React, { useState } from "react";

export default function Home() {
  const [totalBill, setTotalBill] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

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

  const calculatePerPersonAmount = () => {
    return numberOfPeople > 1 ? totalBill / numberOfPeople : 0;
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
          />
        </label>
      </div>
      <div>
        <h2>Resultado</h2>
        <p>Valor por pessoa: R$ {calculatePerPersonAmount().toFixed(2)}</p>
      </div>
    </div>
  );
}
