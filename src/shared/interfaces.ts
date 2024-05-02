import { ReactNode, ChangeEvent } from "react";

export interface CurrencyOption {
  label: string;
  value: string;
}

export interface ExchangeRates {
  conversion_rates: {
    [key: string]: number;
  };
}

export interface InputConfig {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: number;
}

export interface ResultItem {
  label: string;
  value: number;
}

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

export interface CurrencySectionProps {
  currencyOptions: CurrencyOption[];
  onCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  renderedTexts: {
    labelText: string;
    optionLabel: string;
  };
  selectedCurrency: string;
}

export interface CustomButtonProps {
  children: ReactNode;
  onClick: () => void;
  width: string;
  variant: string;
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

export interface InputSectionProps {
  language: "english" | "portuguese";
  inputConfigs: InputConfig[];
  onAnimationComplete: () => void;
  handleCustomTipChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setTipPercentage: (percentage: number) => void;
  isAnimating: boolean;
  tipPercentage: number;
}

export interface LinkItem {
  label: string;
  href: string;
  imageSrc: string;
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
  onCustomTipChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTipButtonClick: (percentage: number) => void;
  tipPercentage: number;
  tipLabel: string;
}

export interface Translation {
  buttonText: string;
  currencyLabelText: string;
  currencyOptionLabel: string;
  foodLabel: string;
  drinkLabel: string;
  peopleLabel: string;
  apartLabel: string;
  tipLabel: string;
  resultsHeading: string;
  resultLabels: string[];
  currencyOptions: { value: string; label: string }[];
}

export interface Translations {
  english: Translation;
  portuguese: Translation;
}

export interface SettingsSectionProps {
  language: "english" | "portuguese";
  toggleLanguage: () => void;
  onAnimationComplete: () => void;
  translations: Translations;
  isAnimating: boolean;
  selectedCurrency: string;
  handleCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  foodAndDrinkTotal: number;
  apartBill: number;
  tipPercentage: number;
  calculateTotalWithTip: () => number;
  exchangeRates: ExchangeRates | null;
}
