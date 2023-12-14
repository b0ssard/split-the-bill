import React from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

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

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label>
      {label}
      <input
        step=".01"
        value={value === null || value === undefined ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  </div>
);

export default Input;
