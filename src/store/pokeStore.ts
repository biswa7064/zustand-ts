import { getPokesData } from "@/apis/pokeApi"
import { create } from "zustand"

export interface PokeType {
  name: string
  url: string
}

export interface PokeStateType {
  isLoadingPokes: boolean
  pokes: PokeType[]
  errMsg: string | undefined
  fetchPokemonData: () => Promise<void>
}

const usePokeStore = create<PokeStateType>((set) => ({
  isLoadingPokes: true,
  pokes: [],
  errMsg: undefined,
  fetchPokemonData: async () => {
    await getPokesData(set)
  },
}))

export default usePokeStore
