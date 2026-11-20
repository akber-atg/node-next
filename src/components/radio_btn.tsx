
"use client";

import styles from "./radio_btn.module.css"
type RadioOption = {
  id: number | string;
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function RadioGroup({options,name,selectedValue,onChange}: RadioGroupProps) {
  return (
      <div className={styles.radioGroup}>
      {options.map((option) => (
        <label key={option.id} className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

