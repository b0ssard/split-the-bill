import React from "react";
import Button from "./Button";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  HStack,
} from "@chakra-ui/react";
import Input from "./Inputs";
import { InputConfig, TipSectionProps } from "../shared/utils";

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
      label: `${tipLabel}`,
      value: tipPercentage,
      onChange: onCustomTipChange,
    },
  ];

  const renderTipButtons = () => {
    const tipValues = [5, 10, 15];

    return tipValues.map((percentage) => (
      <Button
        width="70px"
        key={percentage}
        onClick={() => handleTipButtonClick(percentage)}
      >
        {percentage}%
      </Button>
    ));
  };

  return (
    <Card>
      <Box mb={4}>
        <Input inputConfigs={inputConfigs} />
        <HStack spacing={2}>{renderTipButtons()}</HStack>
      </Box>
    </Card>
  );
};

export default TipSection;
