import { StoreApi } from "zustand"
export type SetStateType<T> = StoreApi<T>["setState"]
export type GetStateType<T> = StoreApi<T>["getState"]
