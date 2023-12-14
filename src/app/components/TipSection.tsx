import React from "react";
import Input from "./Input";

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

  return (
    <div>
      <Input
        label="Gorjeta:"
        value={tipPercentage}
        onChange={onCustomTipChange}
      />
      <div>
        {[5, 10, 15].map((percentage) => (
          <button
            key={percentage}
            onClick={() => handleTipButtonClick(percentage)}
          >
            Gorjeta {percentage}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default TipSection;
