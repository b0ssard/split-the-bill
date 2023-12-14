import React from "react";

interface CurrencySectionProps {
  selectedCurrency: string;
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencySection: React.FC<CurrencySectionProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  return (
    <div>
      <label>
        Moeda:
        <select value={selectedCurrency} onChange={onCurrencyChange}>
          {[
            { value: "USD", label: "USD - Dólar" },
            { value: "EUR", label: "EUR - Euro" },
            { value: "CAD", label: "CAD - Dólar Canadense" },
          ].map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CurrencySection;
