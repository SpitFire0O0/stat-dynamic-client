// Базовый селект: обёртка над Chakra Select с единым интерфейсом
import React from 'react';
import { FormControl, FormLabel, Select as CSelect, FormHelperText } from '@chakra-ui/react';

interface Option { label: string; value: string; }

interface Props {
  name: string;          // имя поля/атрибут id
  label?: string;        // подпись над полем
  placeholder?: string;  // плейсхолдер
  helperText?: string;   // подсказка под полем
  options: Option[];     // варианты выбора
  value?: string;        // текущее значение
  onChange?: (v: string) => void; // колбэк изменения
}

export const Select: React.FC<Props> = ({ name, label, placeholder, helperText, options, value, onChange }) => (
  <FormControl>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <CSelect id={name} name={name} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </CSelect>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
