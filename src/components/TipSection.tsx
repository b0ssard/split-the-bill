import React from "react";
import { Button, VStack, HStack } from "@chakra-ui/react";
import Input from "./Inputs";
import { InputConfig, TipSectionProps } from "./types";

const TipSection: React.FC<TipSectionProps> = ({
  tipPercentage,
  onCustomTipChange,
  onTipButtonClick,
}) => {
  const handleTipButtonClick = (percentage: number) => {
    onTipButtonClick(percentage);
  };

  const inputConfigs: InputConfig[] = [
    {
      label: "Gorjeta:",
      value: tipPercentage,
      onChange: onCustomTipChange,
    },
  ];

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
      <Input inputConfigs={inputConfigs} />
      <HStack spacing={2}>{renderTipButtons()}</HStack>
    </VStack>
  );
};

export default TipSection;
