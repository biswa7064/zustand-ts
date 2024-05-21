import { PokeActionsType, PokeStateType, usePokeStore } from "@/store/pokeStore"
import { StoreType } from "@/types"
import { MockProxy, mock } from "jest-mock-extended"

const mockCreatePokeStore: MockProxy<
  StoreType<PokeStateType, PokeActionsType>
> = mock<StoreType<PokeStateType, PokeActionsType>>()

describe(usePokeStore, () => {
  beforeEach(() => {
    mockCreatePokeStore.actions.fetchPokemonData = jest.fn().mockReturnValue([])
  })
  it("should validate poke store", () => {
    expect(mockCreatePokeStore.actions.fetchPokemonData).not.toHaveBeenCalled()
  })
})
