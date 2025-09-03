<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useSystemStore } from '@/stores/system'
import { toRaw } from 'vue'
import { confirmEvent } from '@/components/ConfirmWindow/confirmConst'
import { emitter } from '@/eventBus'

const systemStore = useSystemStore()

const updateVisible = (bool: boolean) => {
  systemStore.setDialog(bool)
  emitter.emit(confirmEvent, { confirm: false })
}
</script>

<template>
  <Dialog
    v-for="item in toRaw(systemStore.dialogOptions)"
    :header="systemStore.dialogOptions.header"
    :visible="systemStore.isOpenDialogWindow"
    modal
    :closable="systemStore.dialogOptions.closable"
    :style="{ width: `${systemStore.dialogWidth}px` }"
    @update:visible="updateVisible($event)"
  >
    <!-- :style="{ width: `${systemStore.dialogWidth}px` }" -->
    <component
      :is="item.component"
      @close="systemStore.setDialog(false)"
    />
  </Dialog>
</template>

<style scoped lang="scss">
</style>
