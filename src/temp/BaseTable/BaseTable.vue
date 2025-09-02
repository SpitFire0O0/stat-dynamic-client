<script setup lang="ts" generic="T">
import DataTable from 'primevue/datatable'
import { TableColumn } from '@/components/baseComponents/BaseTable/types'
import Column from 'primevue/column'
import { inject } from 'vue'
import { dayjsSymbol } from '@/keys.ts'
import Paginator from 'primevue/paginator'

defineProps<{
  list: T[]
  columns: TableColumn<T>[]
  loading: boolean
  totalRecords?: number
  rows?: number
  rowPerPage?: number[]
  first?: number
  sort?: string
  disablePaginator?: boolean
  sortOrder?: number
  hasSelect?: boolean
  rowClass?: (data: T) => string | undefined
}>()

const dayjs = inject(dayjsSymbol)!

const emits = defineEmits([`change`, `sort`])

const selected = defineModel<T[]>()
</script>

<template>
  <DataTable
    v-model:selection="selected"
    :value="list"
    scrollable
    scroll-height="flex"
    :sort-field="sort"
    :sort-order="sortOrder"
    lazy
    data-key="id"
    :loading="loading"
    :row-class="rowClass"
    @sort="emits('sort', $event)"
  >
    <Column
      v-if="hasSelect"
      selection-mode="multiple"
    />

    <template #footer>
      <Paginator
        :first="first"
        :total-records="totalRecords"
        :rows="rows"
        :pt="{ paginatorContainer: { class: disablePaginator && `pointer-events-none opacity-50` }}"
        :rows-per-page-options="rowPerPage"
        @page="emits('change', $event)"
      />
    </template>

    <template
      v-for="(_, name) in $slots"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>

    <template #header>
      <div class="flex justify-between w-full items-center">
        <slot name="table-header" />
      </div>
    </template>

    <Column
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :header="column.header"
      :sortable="!!column.sortable"
      :filter-field="column.field"
    >
      <template
        v-if="!!column.filterTemplate"
        #filter
      >
        <component :is="column.filterTemplate" />
      </template>

      <template
        v-if="column.headerTemplate"
        #header="{ data }"
      >
        <component
          :is="column.headerTemplate"
          :data="data"
        />
      </template>

      <template
        v-if="column.cellTemplate"
        #body="{ data }"
      >
        <component
          :is="column.cellTemplate"
          :data="data"
        />
      </template>

      <template
        v-else-if="column.isDateTime"
        #body="{ data, field }"
      >
        <div>{{ data[field] ? dayjs(data[field]).format('DD MMM, YYYY HH:mm') : '-' }}</div>
        <small>{{ data[field] && dayjs(data[field]).fromNow() }}</small>
      </template>
    </Column>

    <slot name="additionalColumn" />
  </DataTable>
</template>

<style lang="scss"></style>
