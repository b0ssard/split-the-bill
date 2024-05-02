export interface ApiResponse {
  result: string;
  base_code: string;
  conversion_rates: {
    USD: number;
    EUR: number;
    CAD: number;
    [key: string]: number;
  };
}

export interface CurrencyOption {
  label: string;
  value: string;
}

export interface CurrencySectionProps {
  currencyOptions: CurrencyOption[];
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  renderedTexts: {
    labelText: string;
    optionLabel: string;
  };
  selectedCurrency: string;
}

export interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  width: string;
  variant: string;
}

export interface ExchangeRates {
  conversion_rates: {
    [key: string]: number;
  };
}

export interface InputConfig {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: number;
}

export interface InputListProps {
  inputConfigs: InputConfig[];
}

export interface LinkItem {
  label: string;
  href: string;
  imageSrc: string;
}

export interface ResultItem {
  label: string;
  value: number;
}

export interface ResultsProps {
  apartBillWithTip: number;
  calculateTotalWithTip: number;
  exchangeRates: ExchangeRates | null;
  foodAndDrinkTotal: number;
  resultLabels: string[];
  selectedCurrency: string;
}

export interface TipSectionProps {
  onCustomTipChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTipButtonClick: (percentage: number) => void;
  tipPercentage: number;
  tipLabel: string;
}

export const formatCurrencyValue = (
  value: number,
  selectedCurrency: string,
  conversionRate: number,
): string => {
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
};

export const generateInputConfig = (
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
): InputConfig => ({
  label,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    setter(isNaN(inputValue) ? 0 : inputValue);
  },
  value,
});

interface InputData {
  foodBill: number;
  drinkBill: number;
  tipPercentage: number;
  apartBill: number;
  People: number;
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
