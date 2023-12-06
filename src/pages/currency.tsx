import { useEffect, useState } from "react";
import { getExchangeRates, ApiResponse } from "@/app/api";

const Currency: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rates = await getExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Exchange Rate App</h1>
      {exchangeRates && (
        <div>
          <p>Real to USD: {exchangeRates.conversion_rates.USD}</p>
          <p>Real to EUR: {exchangeRates.conversion_rates.EUR}</p>
          <p>Real to CAD: {exchangeRates.conversion_rates.CAD}</p>
        </div>
      )}
    </div>
  );
};

export default Currency;
