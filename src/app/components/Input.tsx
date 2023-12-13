import React from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

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
