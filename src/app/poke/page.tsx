"use client"
import { PokeComponent } from "@/components"
import ToggleButton from "@/components/ToggleButton"
import usePoke from "@/hooks/usePoke"
import React from "react"

const Poke = () => {
  const { pokes, isLoadingPokes, errMsg } = usePoke()
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
