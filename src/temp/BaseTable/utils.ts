import { PagePaginator } from "@/types/pageable"
import type { TablePaginator } from "./types"

export const setFilterFromTable = (data: TablePaginator): Partial<PagePaginator> => ({
  size: data.rows,
  page: data.page + 1
})