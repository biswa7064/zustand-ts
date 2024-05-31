import { CreateState, StoreTypeWithAction } from "@/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const middlewares = (
  f: CreateState<StoreTypeWithAction<ToggleStateType, ToggleActionType>>
) =>
  persist(f, {
    name: "toggleStore",
    storage: createJSONStorage(() => localStorage),
  })
export interface ToggleStateType {
  isChecked: boolean
}

interface ToggleActionType {
  handleToggle: () => void
  // eslint-disable-next-line no-unused-vars
  handleClear: (state: ToggleStateType) => void
}
const useToggleStore = create<
  StoreTypeWithAction<ToggleStateType, ToggleActionType>
>()(
  middlewares((set, get) => ({
    isChecked: get()?.isChecked ?? false,
    handleToggle: () => set((state) => ({ isChecked: !state.isChecked })),
    handleClear: ({ isChecked }) =>
      set((state) => ({ isChecked: isChecked && !state.isChecked })),
  }))
)

export const useToggleState = () => useToggleStore((state) => state)
export const useToggleAction = () =>
  useToggleStore<ToggleActionType>((state) => ({
    handleToggle: state.handleToggle,
    handleClear: state.handleClear,
  }))
