import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, HStack, Spinner, Text, IconButton } from '@chakra-ui/react';
import type { TableColumn, TablePaginator, SortChange, PageChange } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Key = string | number;

interface Props<T> {
  rows: T[];
  columns: TableColumn<T>[];
  loading?: boolean;

  // Сортировка
  sortField?: string;
  sortOrder?: 1 | -1;
  onSortChange?: (e: SortChange) => void;

  // Пагинация (управляемая извне)
  paginator?: TablePaginator;
  onPageChange?: (e: PageChange) => void;

  // Рендер дополнительной правой колонки (например, действия)
  renderActions?: (row: T) => React.ReactNode;
}

export function BaseTable<T extends Record<string, any>>({
  rows,
  columns,
  loading,
  sortField,
  sortOrder,
  onSortChange,
  paginator,
  onPageChange,
  renderActions,
}: Props<T>) {
  const handleHeaderClick = (c: TableColumn<T>) => {
    if (!c.sortable) return;
    const field = typeof c.field === 'function' ? undefined : (c.field as string | undefined);
    if (!field) return;
    const next: SortChange = {
      field,
      order: sortField === field ? ((sortOrder === 1 ? -1 : 1) as 1 | -1) : 1,
    };
    onSortChange?.(next);
  };

  const renderHeader = (c: TableColumn<T>, idx: number) => {
    const ActiveIcon = sortField === c.field ? (sortOrder === 1 ? ChevronUp : ChevronDown) : null;
    const content = c.headerTemplate
      ? React.createElement(c.headerTemplate as any, { data: null })
      : c.header ?? '';
    return (
      <Th key={`h-${idx}`} onClick={() => handleHeaderClick(c)} cursor={c.sortable ? 'pointer' : 'default'} width={c.width as any}>
        <HStack spacing={2}>
          <span>{content}</span>
          {ActiveIcon && <ActiveIcon size={14} />}
        </HStack>
      </Th>
    );
  };

  const renderCell = (c: TableColumn<T>, row: T, rIdx: number, cIdx: number) => {
    if (c.cellTemplate) return <Td key={`c-${rIdx}-${cIdx}`}>{React.createElement(c.cellTemplate as any, { data: row })}</Td>;
    if (typeof c.field === 'function') return <Td key={`c-${rIdx}-${cIdx}`}>{c.field(row)}</Td>;
    const value = c.field ? row[c.field as Key] : '';
    if (c.isDateTime && value) {
      try {
        const d = new Date(String(value));
        return <Td key={`c-${rIdx}-${cIdx}`}>{d.toLocaleString('ru-RU')}</Td>;
      } catch {
        return <Td key={`c-${rIdx}-${cIdx}`}>{String(value)}</Td>;
      }
    }
    return <Td key={`c-${rIdx}-${cIdx}`}>{String(value ?? '')}</Td>;
  };

  const totalCols = columns.length + (renderActions ? 1 : 0);

  return (
    <Box borderWidth="1px" borderRadius="md" overflowX="auto">
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            {columns.map(renderHeader)}
            {renderActions && <Th>Действия</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr><Td colSpan={totalCols}><HStack py={4} spacing={3}><Spinner size="sm" /><Text>Загрузка...</Text></HStack></Td></Tr>
          ) : rows.length === 0 ? (
            <Tr><Td colSpan={totalCols}><Text py={4} color="gray.500">Нет данных</Text></Td></Tr>
          ) : (
            rows.map((row, rIdx) => (
              <Tr key={rIdx} _hover={{ bg: 'gray.50' }}>
                {columns.map((c, cIdx) => renderCell(c, row, rIdx, cIdx))}
                {renderActions && <Td>{renderActions(row)}</Td>}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {/* Пагинацию и фильтры можно добавить позже, когда они понадобятся */}
    </Box>
  );
}

