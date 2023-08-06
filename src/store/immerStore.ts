import { StoreType } from "@/types"
import { produce, Draft } from "immer"
import { create } from "zustand"
const arr = [
  {
    id: Math.floor(Math.random() * 100),
    name: "River Where the Moon Rises",
  },
  {
    id: Math.floor(Math.random() * 100),
    name: "The Crowned Clown",
  },
]

type ArrItemType = (typeof arr)[0]

interface ImmerStateType {
  items: typeof arr
}

interface ImmerActionType {
  getItems: () => void
  addItem: (item: (typeof arr)[0]) => void
  removeItem: (id: number) => void
}

export type ImmerStoreType = StoreType<ImmerStateType, ImmerActionType>

const useImmerStore = create<ImmerStoreType>((set) => ({
  items: [],
  actions: {
    getItems: () => {
      set({ items: arr })
    },
    addItem: (payload: ArrItemType) => {
      set(
        produce((draft: Draft<ImmerStateType>) => {
          draft.items.push(payload)
        })
      )
    },
    removeItem: (id: number) => {
      set(
        produce((draft: Draft<ImmerStateType>) => ({
          items: draft.items.filter((item) => item.id !== id),
        }))
      )
    },
  },
}))

export const useImmerStateSelector = () => useImmerStore((state) => state)
export const useImmerActionSelector = () =>
  useImmerStore((state) => state.actions)
