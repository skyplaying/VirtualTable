import React, { useState, useEffect } from "react";
import "./index.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setOpen(false);
  };

  useEffect(() => {
    const close = (e: any) => {
      if (e.target.className !== "selected") {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, []);

  return (
    <div className="select">
      <div className="selected" onClick={() => setOpen(!open)}>
        {options.find((option) => option.value === value)?.label}
      </div>
      {open && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className="option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
