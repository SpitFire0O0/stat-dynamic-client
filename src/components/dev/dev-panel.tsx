import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { RoleSwitcher } from './role-switcher';
import { MockSwitcher } from './mock-switcher';

export const DevPanel: React.FC = () => {
  return (
    <Box position="fixed" top="8px" right="8px" zIndex={1000} bg="white" borderWidth="1px" borderRadius="md" p={2} shadow="md">
      <HStack spacing={3}>
        <MockSwitcher />
        <RoleSwitcher />
      </HStack>
    </Box>
  );
};

