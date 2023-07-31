import { getPokesData } from "@/apis/pokeApi"
import { StoreType } from "@/types"
import { create } from "zustand"
import { shallow } from "zustand/shallow"

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

const usePokeStore = create<StoreType<PokeStateType, PokeActionsType>>(
  (set) => ({
    isLoadingPokes: true,
    pokes: [],
    errMsg: undefined,
    actions: {
      fetchPokemonData: async () => {
        await getPokesData(set)
      },
    },
  })
)

// selectors
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
