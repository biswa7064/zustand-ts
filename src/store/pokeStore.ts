import { getPokesData } from "@/apis/pokeApi"
import { ExtractStateType, StoreType } from "@/types"
import { create } from "zustand"
import { shallow } from "zustand/shallow"
import { logger } from "./middleware/logMiddleware"

export interface PokeType {
  name: string
  url: string
}

export interface PokeStateType {
  isLoadingPokes: boolean
  pokes: PokeType[]
  errMsg?: string
}

export interface PokeActionsType {
  fetchPokemonData: () => Promise<void>
}

export const usePokeStore = create<StoreType<PokeStateType, PokeActionsType>>(
  logger((set) => ({
    isLoadingPokes: true,
    pokes: [],
    errMsg: undefined,
    actions: {
      fetchPokemonData: async () => {
        await getPokesData(set)
      },
    },
  }))
)

// selectors
// normal logic
export const usePokesState = () =>
  usePokeStore(
    (state) => ({
      pokes: state.pokes,
      isLoadingPokes: state.isLoadingPokes,
      errMsg: state.errMsg,
    }),
    shallow
  )
export const usePokeActions = () => usePokeStore((state) => state.actions)

// like redux/advance logic
export const pokesSelector = (state: ExtractStateType<typeof usePokeStore>) =>
  state.pokes
