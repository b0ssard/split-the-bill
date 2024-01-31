import React from "react";
import { Button, Input, VStack, HStack, FormControl } from "@chakra-ui/react";

interface TipSectionProps {
  tipPercentage: number;
  onCustomTipChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTipButtonClick: (percentage: number) => void;
  label: string;
}

const TipSection: React.FC<TipSectionProps> = ({
  tipPercentage,
  onCustomTipChange,
  label,
  onTipButtonClick,
}) => {
  const handleTipButtonClick = (percentage: number) => {
    onTipButtonClick(percentage);
  };

  const renderTipButtons = () => {
    const tipValues = [5, 10, 15];

    return tipValues.map((percentage) => (
      <Button
        key={percentage}
        colorScheme="teal"
        onClick={() => handleTipButtonClick(percentage)}
      >
        Gorjeta {percentage}%
      </Button>
    ));
  };

  return (
    <VStack spacing={4} align="flex-start">
      <FormControl>
        <label>{label}</label>
        <Input
          type="number"
          value={tipPercentage}
          onChange={onCustomTipChange}
          placeholder="Digite a gorjeta personalizada"
        />
      </FormControl>
      <FormControl>
        <HStack spacing={2}>{renderTipButtons()}</HStack>
      </FormControl>
    </VStack>
  );
};

export default TipSection;
