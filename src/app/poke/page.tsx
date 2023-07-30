"use client"
import usePokeStore from "@/store/pokeStore"
import React from "react"

const Poke = () => {
  const pokeState = usePokeStore((state) => state)
  console.log({ pokeState })
  return <div>Poke</div>
}

export default Poke
