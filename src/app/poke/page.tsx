"use client"
import { PokeComponent } from "@/components"
import ToggleButton from "@/components/ToggleButton"
import { usePokeActions, usePokesState } from "@/store/pokeStore"
import React, { useEffect } from "react"

const Poke = () => {
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
  console.log({ pokes, isLoadingPokes, errMsg })
  return (
    <div className="p-[1em] flex flex-col space-y-6 h-full">
      <ToggleButton />
      <PokeComponent
        pokes={pokes}
        isLoadingPokes={isLoadingPokes}
        errMsg={errMsg}
      />
    </div>
  )
}

export default Poke
