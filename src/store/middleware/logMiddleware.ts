import { StateCreator } from "zustand"

export const logger =
  <T extends object>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (args) => {
        console.log({ currentState: get() })
        console.log("Applying args - ", args)
        set(args)
        console.log({ newState: get() })
      },
      get,
      api
    )
