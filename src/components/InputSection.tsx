import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Input from "@/components/Inputs";
import TipSection from "@/components/TipSection";
import translations from "@/shared/translations.json";
import { InputSectionProps } from "@/shared/interfaces";

export default function InputSection({
  language,
  inputConfigs,
  onAnimationComplete,
  handleCustomTipChange,
  setTipPercentage,
  isAnimating,
  tipPercentage,
}: InputSectionProps) {
  return (
    <Box>
      <Heading
        as="h1"
        size="3xl"
        mb={4}
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        SPL / IT.
      </Heading>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: isAnimating ? 0 : 5,
        }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={onAnimationComplete}
      >
        <Input inputConfigs={inputConfigs} />
        <TipSection
          tipLabel={translations[language].tipLabel}
          tipPercentage={tipPercentage}
          onCustomTipChange={handleCustomTipChange}
          onTipButtonClick={(percentage) => setTipPercentage(percentage)}
        />
      </motion.span>
    </Box>
  );
}
