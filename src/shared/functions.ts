import { InputConfig, InputData } from "./interfaces";
export function formatCurrencyValue(
  value: number,
  selectedCurrency: string,
  conversionRate: number,
): string {
  const formattedValueConverted = (value * conversionRate).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: selectedCurrency,
    },
  );
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `${formattedValue} ou ${formattedValueConverted}`;
}

export function generateInputConfig(
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
): InputConfig {
  return {
    label,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseFloat(e.target.value);
      setter(isNaN(inputValue) ? 0 : inputValue);
    },
    value,
  };
}

export function loadInputDataFromLocalStorage({
  setFoodBill,
  setDrinkBill,
  setTipPercentage,
  setApartBill,
  setPeople,
}: {
  setFoodBill: (value: number) => void;
  setDrinkBill: (value: number) => void;
  setTipPercentage: (value: number) => void;
  setApartBill: (value: number) => void;
  setPeople: (value: number) => void;
}) {
  const savedFoodBill = localStorage.getItem("foodBill");
  if (savedFoodBill) {
    setFoodBill(parseFloat(savedFoodBill));
  }
  const savedDrinkBill = localStorage.getItem("drinkBill");
  if (savedDrinkBill) {
    setDrinkBill(parseFloat(savedDrinkBill));
  }
  const savedTipPercentage = localStorage.getItem("tipPercentage");
  if (savedTipPercentage) {
    setTipPercentage(parseFloat(savedTipPercentage));
  }
  const savedApartBill = localStorage.getItem("apartBill");
  if (savedApartBill) {
    setApartBill(parseFloat(savedApartBill));
  }
  const savedPeople = localStorage.getItem("People");
  if (savedPeople) {
    setPeople(parseFloat(savedPeople));
  }
}

export function saveInputDataToLocalStorage({
  foodBill,
  drinkBill,
  tipPercentage,
  apartBill,
  People,
}: InputData) {
  localStorage.setItem("foodBill", foodBill.toString());
  localStorage.setItem("drinkBill", drinkBill.toString());
  localStorage.setItem("tipPercentage", tipPercentage.toString());
  localStorage.setItem("apartBill", apartBill.toString());
  localStorage.setItem("People", People.toString());
}
