import { Component } from 'vue'

export type TableInsideComponent = Component<{ data?: unknown } | undefined>

export type TableColumn<T> = {
  field?: keyof T | ((data: T) => string)
  header?: string
  sortable?: boolean
  filterTemplate?: TableInsideComponent
  cellTemplate?: TableInsideComponent
  headerTemplate?: TableInsideComponent
  isDateTime?: boolean
}

export type TablePaginator = {
  page: number
  sortField: string
  sortOrder: number
  rows: number
}
