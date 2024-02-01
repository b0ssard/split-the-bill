import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { getExchangeRates, ApiResponse } from "@/app/api";
import Input, { generateInputConfig } from "@/components/Inputs";
import TipSection from "@/components/TipSection";
import CurrencySection from "@/components/CurrencySection";
import Results from "@/components/ResultsSection";

const Home: React.FC = () => {
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

  const apartBillWithTip = apartBill + apartBill * (tipPercentage / 100);

  const calculateTotalWithTip =
    foodBill +
    drinkBill +
    (foodBill + drinkBill) * (tipPercentage / 100) -
    apartBillWithTip;

  const foodOnlyTotal =
    foodOnlyPeople !== 0
      ? (foodBill + foodBill * (tipPercentage / 100)) /
        (foodOnlyPeople + foodAndDrinkPeople)
      : 0;

  const drinkOnlyTotal =
    drinkOnlyPeople !== 0
      ? (drinkBill + drinkBill * (tipPercentage / 100)) /
        (drinkOnlyPeople + foodAndDrinkPeople)
      : 0;

  const calculateFoodAndDrinkTotal =
    foodAndDrinkPeople !== 0
      ? (calculateTotalWithTip -
          (foodOnlyTotal * foodOnlyPeople + drinkOnlyTotal * drinkOnlyPeople)) /
        foodAndDrinkPeople
      : 0;

  const resultLabels = [
    "Valor Total a ser dividido",
    "Valor para pessoas que comeram e beberam",
    "Valor para pessoas que só comeram",
    "Valor para pessoas que só beberam",
    "Valor A Parte",
  ];

  const renderedTexts = {
    labelText: "Moeda",
    optionLabel: "Selecionar",
  };

  const customCurrencyOptions = [
    { value: "USD", label: "USD - Dólar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "CAD", label: "CAD - Dólar Canadense" },
  ];

  return (
    <Container maxW="container.md" mt={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="stretch"
        p={4}
      >
        <Box flex="1">
          <Heading as="h1" mb={4}>
            Dividir Conta
          </Heading>
          <Input inputConfigs={inputConfigs} />
          <TipSection
            label="Gorjeta:"
            tipPercentage={tipPercentage}
            onCustomTipChange={handleCustomTipChange}
            onTipButtonClick={(percentage) => setTipPercentage(percentage)}
          />
          <CurrencySection
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
            renderedTexts={renderedTexts}
            currencyOptions={customCurrencyOptions}
          />
        </Box>
        {exchangeRates && (
          <Box flex="1" ml={{ base: 0, md: 4 }}>
            <Divider my={4} />
            <Results
              heading="Resultado:"
              ou=" ou "
              calculateTotalWithTip={calculateTotalWithTip}
              calculateFoodAndDrinkTotal={calculateFoodAndDrinkTotal}
              foodOnlyTotal={foodOnlyTotal}
              drinkOnlyTotal={drinkOnlyTotal}
              apartBillWithTip={apartBillWithTip}
              selectedCurrency={selectedCurrency}
              exchangeRates={exchangeRates}
              resultLabels={resultLabels}
            />
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default Home;
