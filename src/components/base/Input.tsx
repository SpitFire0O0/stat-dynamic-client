// Базовое поле ввода: тонкая обёртка над Chakra Input
import React from 'react';
import { FormControl, FormLabel, Input as CInput, FormHelperText } from '@chakra-ui/react';

interface Props {
  name: string;          // имя поля/атрибут id
  label?: string;        // подпись над полем
  placeholder?: string;  // плейсхолдер
  helperText?: string;   // подсказка под полем
  type?: string;         // тип инпута (text, number и т.д.)
  value?: string;        // текущее значение
  onChange?: (v: string) => void; // колбэк изменения
}

export const Input: React.FC<Props> = ({ name, label, placeholder, helperText, type = 'text', value, onChange }) => (
  <FormControl>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <CInput id={name} name={name} type={type} placeholder={placeholder} value={value}
            onChange={(e) => onChange?.(e.target.value)} />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
