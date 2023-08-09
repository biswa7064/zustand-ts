import { usePokeActions, usePokesState } from "@/store/pokeStore"
import { useEffect } from "react"

const usePoke = () => {
  const { pokes, isLoadingPokes, errMsg } = usePokesState()
  const { fetchPokemonData } = usePokeActions()
  useEffect(() => {
    let isMount = true
    if (isMount) {
      fetchPokemonData()
    }
    return () => {
      isMount = false
    }
  }, [fetchPokemonData])
  return {
    pokes,
    isLoadingPokes,
    errMsg,
  }
}

export default usePoke
