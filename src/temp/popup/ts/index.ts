import { defineStore } from 'pinia'
import { StoreModule } from '../names'
import type { SystemState } from './types'
import { defaultDialogWidth } from '@/_app.options/main.options'
import { getDialogsOptions, DialogKey } from '@/_app.options/dialogWindows'

const defaultDialog: DialogKey = DialogKey.ADD_SESSION_MAPPING

export const useSystemStore = defineStore(StoreModule.SYSTEM, {
  state: (): SystemState => ({
    isLoadedApp: false,
    isOpenDialogWindow: false,
    dialogKey: defaultDialog,
    dialogOptions: getDialogsOptions()[defaultDialog],
    dialogWidth: defaultDialogWidth
  }),

  actions: {
    setLoadedApp(load: boolean) {
      this.isLoadedApp = load
    },
    setDialog(
      open: boolean,
      dialogKey?: DialogKey,
      dialogWidth = defaultDialogWidth,
    ) {
      this.dialogWidth = dialogWidth
      this.isOpenDialogWindow = open
      if (dialogKey) {
        this.dialogKey = dialogKey
        this.dialogOptions = getDialogsOptions()[dialogKey]
      }
    }
  },
})

export type SystemStore = ReturnType<typeof useSystemStore>
