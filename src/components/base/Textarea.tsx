// Базовое многострочное поле: обёртка над Chakra Textarea
import React from 'react';
import { FormControl, FormLabel, Textarea as CTextarea, FormHelperText } from '@chakra-ui/react';

interface Props {
  name: string;          // имя поля/атрибут id
  label?: string;        // подпись над полем
  placeholder?: string;  // плейсхолдер
  helperText?: string;   // подсказка под полем
  value?: string;        // текущее значение
  onChange?: (v: string) => void; // колбэк изменения
}

export const Textarea: React.FC<Props> = ({ name, label, placeholder, helperText, value, onChange }) => (
  <FormControl>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <CTextarea id={name} name={name} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
