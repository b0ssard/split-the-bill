import Button from "./Button";
import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import Input from "./Inputs";
import { TipSectionProps } from "../shared/utils";

export default function TipSection({
  tipLabel,
  tipPercentage,
  onCustomTipChange,
  onTipButtonClick,
}: TipSectionProps) {
  const handleTipButtonClick = (percentage: number) => {
    onTipButtonClick(percentage);
  };

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
        <Input
          inputConfigs={[
            {
              label: ``,
              value: tipPercentage,
              onChange: onCustomTipChange,
            },
          ]}
        />
      </CardBody>
      <CardFooter>
        <HStack>{renderTipButtons()}</HStack>
      </CardFooter>
    </Card>
  );
}
