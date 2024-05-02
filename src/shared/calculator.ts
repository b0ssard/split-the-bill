import { useState, useEffect } from "react";
import { ApiResponse } from "@/shared/interfaces";
import { useToast } from "@chakra-ui/react";
import { getExchangeRates } from "@/app/api";

export default function useCalculatorHooks() {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [People, setPeople] = useState(1);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [apartBill, setApartBill] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ApiResponse | null>(null);

  function handleFetchError() {
    useToast({
      title: "Erro ao obter taxas de câmbio",
      description: "Por favor, tente novamente mais tarde.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const rates = await getExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        handleFetchError();
      }
    }

    fetchData();
  }, []);

  function handleCurrencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCurrency(event.target.value);
  }

  function handleCustomTipChange(event: React.ChangeEvent<HTMLInputElement>) {
    const customTip = parseFloat(event.target.value);
    setTipPercentage(isNaN(customTip) ? 0 : customTip);
  }

  function calculateTotalWithTip() {
    const totalWithoutTip = foodBill + drinkBill;
    return (
      totalWithoutTip + totalWithoutTip * (tipPercentage / 100) - apartBill
    );
  }

  function calculateCategoryTotal(bill: number) {
    return bill !== 0 ? (bill + bill * (tipPercentage / 100)) / People : 0;
  }

  return {
    foodBill,
    setFoodBill,
    drinkBill,
    setDrinkBill,
    People,
    setPeople,
    tipPercentage,
    setTipPercentage,
    apartBill,
    setApartBill,
    selectedCurrency,
    exchangeRates,
    handleCurrencyChange,
    handleCustomTipChange,
    calculateTotalWithTip,
    calculateCategoryTotal,
  };
}
