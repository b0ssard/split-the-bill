import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Button from "./Button";
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
    <motion.div whileTap={{ scale: 0.7 }}>
      <Card
        size="sm"
        variant="outline"
        sx={{ boxShadow: "0 4px 4px rgba(0,0,0,0.1)" }}
      >
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
    </motion.div>
  );
}
