// DEV-переключатель мок-режима API
import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { isMockEnabled } from '../../_api/mock';

export const MockSwitcher: React.FC = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isMockEnabled());
  }, []);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      if (next) localStorage.setItem('api-mock', '1');
      else localStorage.removeItem('api-mock');
      // Перезагружаем, чтобы очистить кэш запросов/инициализацию клиента
      location.reload();
    } catch {}
  };

  return (
    <FormControl display="flex" alignItems="center" width="auto">
      <FormLabel htmlFor="mock-mode" mb="0" fontSize="sm">Mock API</FormLabel>
      <Switch id="mock-mode" size="sm" isChecked={checked} onChange={toggle} />
    </FormControl>
  );
};

