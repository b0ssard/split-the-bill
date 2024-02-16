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
