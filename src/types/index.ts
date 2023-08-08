import { StoreApi } from "zustand"
export type SetStateType<T> = StoreApi<T>["setState"]
export type GetStateType<T> = StoreApi<T>["getState"]
export type StoreType<T, AT> = T & { actions: AT }

// extract state using selector
export type ExtractStateType<ST> = ST extends {
  getState: () => infer T
}
  ? T
  : never
