"use client"
import usePokeStore from "@/store/pokeStore"
import React, { useEffect } from "react"

const Poke = () => {
  const { pokes, isLoadingPokes, errMsg, fetchPokemonData } = usePokeStore()
  useEffect(() => {
    let isMount = true
    if (isMount) {
      fetchPokemonData()
    }
    return () => {
      isMount = false
    }
  }, [])
  console.log({ pokes, isLoadingPokes, errMsg })
  return (
    <div>
      {isLoadingPokes ? (
        <p>Loading....</p>
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <p>{JSON.stringify(pokes)}</p>
      )}
    </div>
  )
}

export default Poke
