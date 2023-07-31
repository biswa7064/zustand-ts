import { StoreApi } from "zustand"
export type SetStateType<T> = StoreApi<T>["setState"]
export type GetStateType<T> = StoreApi<T>["getState"]
export type StoreType<T, AT> = T & { actions: AT }