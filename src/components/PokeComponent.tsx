import { PokeStateType } from "@/store/pokeStore"
import { useToggleState } from "@/store/toggleStore"
import React, { FC, useEffect } from "react"

interface PokePropsType {
  pokes: PokeStateType["pokes"]
  isLoadingPokes: PokeStateType["isLoadingPokes"]
  errMsg: PokeStateType["errMsg"]
}

const PokeComponent: FC<PokePropsType> = ({
  pokes,
  isLoadingPokes,
  errMsg,
}) => {
  const { isChecked } = useToggleState()

  return (
    <div>
      {isLoadingPokes ? (
        <p>Loading....</p>
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <p className={"text-blue-300 dark:text-white"}>
          {JSON.stringify(pokes)}
        </p>
      )}
    </div>
  )
}

export default PokeComponent
