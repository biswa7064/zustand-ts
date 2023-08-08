import { PokeStateType } from "@/store/pokeStore"
import { SetStateType } from "@/types"

const API_BASE_URL = "https://pokeapi.co/api/v2"
export const getPokesData = async (set: SetStateType<PokeStateType>) => {
  try {
    const res = await fetch(`${API_BASE_URL}/pokemon/`)
    const json = await res.json()
    set({
      isLoadingPokes: false,
      pokes: json.results,
    })
  } catch (error) {
    const err = error as Error
    set({
      isLoadingPokes: false,
      errMsg: err.message,
    })
  }
}
