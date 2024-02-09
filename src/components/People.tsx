import React, { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Text,
} from "@chakra-ui/react";
const FoodAndDrinkPeopleInput = () => {
  const [foodAndDrinkPeople, setFoodAndDrinkPeople] = useState(1);

  const handleInputChange = (valueString: string) => {
    const value = parseInt(valueString);
    if (!isNaN(value)) {
      setFoodAndDrinkPeople(value);
    }
  };

  return (
    <Box mb={4}>
      <Text>Quantas pessoas?</Text>
      <NumberInput
        value={foodAndDrinkPeople.toString()}
        onChange={handleInputChange}
        min={1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export default FoodAndDrinkPeopleInput;
