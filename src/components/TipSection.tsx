import React from "react";
import { Button, Input, VStack } from "@chakra-ui/react";

interface TipSectionProps {
  tipPercentage: number;
  onCustomTipChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTipButtonClick: (percentage: number) => void;
}

const TipSection: React.FC<TipSectionProps> = ({
  tipPercentage,
  onCustomTipChange,
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
        colorScheme="teal" // Adicionei esta propriedade para usar o esquema de cores "teal" do Chakra UI
        onClick={() => handleTipButtonClick(percentage)}
      >
        Gorjeta {percentage}%
      </Button>
    ));
  };

  return (
    <VStack spacing={4} align="flex-start">
      <label>Gorjeta:</label>
      <Input
        type="number"
        value={tipPercentage}
        onChange={onCustomTipChange}
        placeholder="Digite a gorjeta personalizada"
      />
      <VStack spacing={2} align="flex-start">
        {renderTipButtons()}
      </VStack>
    </VStack>
  );
};

export default TipSection;
