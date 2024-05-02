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

export interface InputData {
  foodBill: number;
  drinkBill: number;
  tipPercentage: number;
  apartBill: number;
  People: number;
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
