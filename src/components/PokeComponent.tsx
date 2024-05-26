import { PokeStateType } from "@/store/pokeStore"
import { useToggleState } from "@/store/toggleStore"
import { FC } from "react"

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
  console.log({ isChecked })
  return (
    <div>
      {isLoadingPokes ? (
        <p>Loading....</p>
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <p className={"text-blue-500"}>{JSON.stringify(pokes)}</p>
      )}
    </div>
  )
}

export default PokeComponent
