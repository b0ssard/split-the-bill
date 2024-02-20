import React from "react";
import Button from "./Button";
import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
      label: ``,
      value: tipPercentage,
      onChange: onCustomTipChange,
    },
  ];

  const renderTipButtons = () => {
    const tipValues = [5, 10, 15];

    return tipValues.map((percentage) => (
      <Button
        variant="solid"
        width="70px"
        key={percentage}
        onClick={() => handleTipButtonClick(percentage)}
      >
        {percentage}%
      </Button>
    ));
  };

  return (
    <Card size="sm" variant="outline">
      <CardHeader>{tipLabel}</CardHeader>
      <CardBody>
        <Input inputConfigs={inputConfigs} />
      </CardBody>
      <CardFooter>
        <HStack>{renderTipButtons()}</HStack>
      </CardFooter>
    </Card>
  );
};

export default TipSection;
