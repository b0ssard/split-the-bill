import React from "react";

export const generateInputConfig = (
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
) => ({
  label,
  value,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    setter(isNaN(inputValue) ? 0 : inputValue);
  },
});

interface InputListProps {
  inputConfigs: {
    label: string;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }[];
}

const Input: React.FC<InputListProps> = ({ inputConfigs }) => (
  <>
    {inputConfigs &&
      inputConfigs.map((config, index) => (
        <div key={index}>
          <label>{config.label}</label>
          <input
            type="number"
            value={config.value || ""}
            onChange={(e) => config.onChange(e)}
            placeholder={config.placeholder}
          />
        </div>
      ))}
  </>
);

export default Input;
