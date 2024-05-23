import { usePokeStore } from "@/store/pokeStore"
import { MockProxy, mock } from "jest-mock-extended"
import { act } from "react-dom/test-utils"
import { getPokesData } from "../../src/apis/pokeApi"
const mockCreatePokeStore: MockProxy<typeof usePokeStore> =
  mock<typeof usePokeStore>()
describe(usePokeStore, () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCreatePokeStore.getState.mockReturnValue({
      pokes: [],
      isLoadingPokes: false,
      errMsg: undefined,
      actions: {
        fetchPokemonData: jest.fn(),
      },
    })
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it("should validate poke store", () => {
    const state = mockCreatePokeStore.getState()
    expect(state.pokes).toEqual([])
    expect(state.errMsg).toBeUndefined()
    expect(state.isLoadingPokes).toBeFalsy()
  })
  it("should return pokes data if any", async () => {
    const pokesData = {
      results: [{ name: "", url: "" }],
    }
    global.fetch = jest.fn().mockImplementation(
      () =>
        ({
          json: jest.fn().mockResolvedValue(pokesData),
        } as any)
    )
    const state = mockCreatePokeStore.getState()
    const set = jest.fn().mockImplementation(() => {
      state.pokes = pokesData.results
    })
    await getPokesData(set)
    await act(async () => {
      await state.actions.fetchPokemonData()
    })
    expect(set).toHaveBeenCalledWith({
      isLoadingPokes: false,
      pokes: pokesData.results,
    })
    expect(state.actions.fetchPokemonData).toHaveBeenCalled()
    expect(state.pokes).toHaveLength(1)
  })
})
