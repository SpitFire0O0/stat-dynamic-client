import type { DialogKey, DialogOptions } from "../../_app.options/dialogWindows"

export type SystemState = {
  isLoadedApp: boolean
  isOpenDialogWindow: boolean
  dialogWidth: number
  dialogKey: DialogKey
  dialogOptions: DialogOptions
}
