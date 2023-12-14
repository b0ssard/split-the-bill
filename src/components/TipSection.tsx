import React from "react";
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
      <button key={percentage} onClick={() => handleTipButtonClick(percentage)}>
        Gorjeta {percentage}%
      </button>
    ));
  };

  return (
    <div>
      <label>Gorjeta: </label>
      <input value={tipPercentage} onChange={onCustomTipChange} />
      <div>{renderTipButtons()}</div>
    </div>
  );
};

export default TipSection;
