import { StoreType } from "@/types"
import { create } from "zustand"

interface ToggleStateType {
  isChecked: boolean
}

interface ToggleActionType {
  handleToggle: () => void
}
type ToggleStoreType = StoreType<ToggleStateType, ToggleActionType>
const useToggleStore = create<ToggleStoreType>((set) => ({
  isChecked: false,
  actions: {
    handleToggle: () => {
      set((state) => ({ isChecked: !state.isChecked }))
    },
  },
}))

export const useToggleState = () => useToggleStore((state) => state)
export const useToggleAction = () => useToggleStore((state) => state.actions)
