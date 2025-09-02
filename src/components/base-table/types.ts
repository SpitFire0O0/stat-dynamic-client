import type { ComponentType, ReactNode } from 'react';

// Компонент, который может быть отрисован внутри ячейки/заголовка колонки
export type TableInsideComponent<T> = ComponentType<{ data: T } | any>;

export type TableColumn<T> = {
  field?: keyof T | ((data: T) => ReactNode);
  header?: string;
  sortable?: boolean;
  filterTemplate?: TableInsideComponent<T>;
  cellTemplate?: TableInsideComponent<T>;
  headerTemplate?: TableInsideComponent<T>;
  isDateTime?: boolean;
  width?: string | number;
};

export type TablePaginator = {
  page: number; // 0-based
  sortField?: string;
  sortOrder?: 1 | -1; // 1 ASC, -1 DESC
  rows: number; // page size
  total?: number;
};

export type SortChange = { field: string; order: 1 | -1 };
export type PageChange = { first: number; rows: number; page: number; pageCount: number };

