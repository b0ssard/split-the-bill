import { useState, useEffect } from "react";
import { ApiResponse, generateInputConfig } from "@/components/types";
import { useToast } from "@chakra-ui/react";
import { getExchangeRates } from "@/app/api";

const useCalculatorHooks = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(1);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [apartBill, setApartBill] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ApiResponse | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await getExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        handleFetchError();
      }
    };

    fetchData();
  }, []);

  const handleFetchError = () => {
    toast({
      title: "Erro ao obter taxas de câmbio",
      description: "Por favor, tente novamente mais tarde.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCurrency(event.target.value);
  };

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const customTip = parseFloat(event.target.value);
    setTipPercentage(isNaN(customTip) ? 0 : customTip);
  };

  const inputConfigs = [
    generateInputConfig("Comida: ", foodBill, setFoodBill),
    generateInputConfig("Bebida: ", drinkBill, setDrinkBill),
    generateInputConfig(
      "Pessoas que comeram e beberam: ",
      foodAndDrinkPeople,
      setFoodAndDrinkPeople,
    ),
    generateInputConfig("Pagar a parte: ", apartBill, setApartBill),
  ];

  const calculateTotalWithTip = () => {
    const totalWithoutTip = foodBill + drinkBill;
    return (
      totalWithoutTip + totalWithoutTip * (tipPercentage / 100) - apartBill
    );
  };

  const calculateCategoryTotal = (bill: number) => {
    return bill !== 0
      ? (bill + bill * (tipPercentage / 100)) / foodAndDrinkPeople
      : 0;
  };

  return {
    foodBill,
    setFoodBill,
    drinkBill,
    setDrinkBill,
    foodAndDrinkPeople,
    setFoodAndDrinkPeople,
    tipPercentage,
    setTipPercentage,
    apartBill,
    setApartBill,
    selectedCurrency,
    exchangeRates,
    inputConfigs,
    handleCurrencyChange,
    handleCustomTipChange,
    calculateTotalWithTip,
    calculateCategoryTotal,
  };
};

export default useCalculatorHooks;
