import React from "react";
import { Box, Button, VStack, HStack } from "@chakra-ui/react";
import Input from "./Inputs";
import { InputConfig, TipSectionProps } from "./types";

const TipSection: React.FC<TipSectionProps> = ({
  tipLabel,
  tipPercentage,
  onCustomTipChange,
  onTipButtonClick,
}) => {
  const handleTipButtonClick = (percentage: number) => {
    onTipButtonClick(percentage);
  };

  const inputConfigs: InputConfig[] = [
    {
      label: `${tipLabel}:`,
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
      <Box mb={4}>
        <Input inputConfigs={inputConfigs} />
        <HStack spacing={2}>{renderTipButtons()}</HStack>
      </Box>
    </VStack>
  );
};

export default TipSection;
