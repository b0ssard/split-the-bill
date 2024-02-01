import { useState, useEffect } from "react";
import { generateInputConfig } from "@/components/Inputs";
import { useToast } from "@chakra-ui/react";
import { getExchangeRates, ApiResponse } from "@/app/api";

const useCalculatorHooks = () => {
  const [foodBill, setFoodBill] = useState(0);
  const [drinkBill, setDrinkBill] = useState(0);
  const [foodOnlyPeople, setFoodOnlyPeople] = useState(0);
  const [drinkOnlyPeople, setDrinkOnlyPeople] = useState(0);
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(0);
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
        toast({
          title: "Erro ao obter taxas de câmbio",
          description: "Por favor, tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const inputConfigs = [
    generateInputConfig("Comida: ", foodBill, setFoodBill),
    generateInputConfig("Bebida: ", drinkBill, setDrinkBill),
    generateInputConfig(
      "Pessoas que comeram e beberam: ",
      foodAndDrinkPeople,
      setFoodAndDrinkPeople,
    ),
    generateInputConfig(
      "Pessoas que só comeram: ",
      foodOnlyPeople,
      setFoodOnlyPeople,
    ),
    generateInputConfig(
      "Pessoas que só beberam: ",
      drinkOnlyPeople,
      setDrinkOnlyPeople,
    ),
    generateInputConfig("Pagar a parte: ", apartBill, setApartBill),
  ];

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

  const calculateTotalWithTip = () => {
    const totalWithoutTip = foodBill + drinkBill;
    const totalWithTip = totalWithoutTip * (1 + tipPercentage / 100);
    return totalWithTip - (apartBill + apartBill * (tipPercentage / 100));
  };

  const calculateCategoryTotal = (bill: number, people: number) => {
    return people !== 0
      ? (bill + bill * (tipPercentage / 100)) / (people + foodAndDrinkPeople)
      : 0;
  };

  return {
    foodBill,
    setFoodBill,
    drinkBill,
    setDrinkBill,
    foodOnlyPeople,
    setFoodOnlyPeople,
    drinkOnlyPeople,
    setDrinkOnlyPeople,
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
