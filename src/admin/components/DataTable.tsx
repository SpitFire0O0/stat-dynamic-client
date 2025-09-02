import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, HStack, IconButton, Text } from '@chakra-ui/react';
import { Edit2, Trash2 } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  title: string;
  accessor?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends Record<string, any>>({ columns, rows, loading, onEdit, onDelete }: Props<T>) {
  return (
    <Box borderWidth="1px" borderRadius="md" overflowX="auto">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            {columns.map((c) => (
              <Th key={String(c.key)}>{c.title}</Th>
            ))}
            {(onEdit || onDelete) && <Th>Действия</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={columns.length + 1}>
                <HStack py={4} spacing={3} align="center">
                  <Spinner size="sm" />
                  <Text>Загрузка...</Text>
                </HStack>
              </Td>
            </Tr>
          ) : rows.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length + 1}>
                <Text py={4} color="gray.500">Нет данных</Text>
              </Td>
            </Tr>
          ) : (
            rows.map((row, idx) => (
              <Tr key={idx} _hover={{ bg: 'gray.50' }}>
                {columns.map((c) => (
                  <Td key={String(c.key)}>
                    {c.accessor ? c.accessor(row) : String(row[c.key as keyof T] ?? '')}
                  </Td>
                ))}
                {(onEdit || onDelete) && (
                  <Td whiteSpace="nowrap">
                    <HStack spacing={1}>
                      {onEdit && (
                        <IconButton aria-label="edit" size="xs" icon={<Edit2 size={14} />} onClick={() => onEdit(row)} />
                      )}
                      {onDelete && (
                        <IconButton aria-label="delete" size="xs" colorScheme="red" icon={<Trash2 size={14} />} onClick={() => onDelete(row)} />
                      )}
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
