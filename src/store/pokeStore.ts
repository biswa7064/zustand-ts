import { create } from "zustand"

const usePokeStore = create(() => ({
  pokes: [],
}))

export default usePokeStore
