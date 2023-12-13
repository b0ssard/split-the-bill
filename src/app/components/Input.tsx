import React from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<number>>,
) => {
  const value = parseFloat(event.target.value);
  setter(isNaN(value) ? 0 : value);
};

export const generateInputConfig = (
  label: string,
  value: number,
  setter: React.Dispatch<React.SetStateAction<number>>,
): {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => ({
  label,
  value,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setter),
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
        type="number"
        step=".01"
        value={value === null || value === undefined ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  </div>
);

export default Input;
