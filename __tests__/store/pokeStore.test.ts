import { pokesSelector, usePokesState, usePokeStore } from "@/store/pokeStore"
import { renderHook } from "@testing-library/react"
import { mock, MockProxy } from "jest-mock-extended"
import { act } from "react-dom/test-utils"
import { getPokesData } from "../../src/apis/pokeApi"
const mockCreatePokeStore: MockProxy<typeof usePokeStore> =
  mock<typeof usePokeStore>()
describe(usePokeStore, () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCreatePokeStore.getState.mockReturnValue({
      pokes: [],
      isLoadingPokes: true,
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
    expect(state.isLoadingPokes).toBeTruthy()
    expect(state.actions.fetchPokemonData).not.toHaveBeenCalled()
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
    expect(state.pokes).toEqual(pokesData.results)
  })
})

describe("usePokesState", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it("should return initial state", () => {
    const { result } = renderHook(() => usePokesState())
    expect(result.current.isLoadingPokes).toBe(true)
    expect(result.current.pokes).toEqual([])
    expect(result.current.errMsg).toBeUndefined()
  })

  it("should return state based on changes", async () => {
    const pokesData = [{ name: "", url: "" }]
    const { result } = renderHook(() => usePokesState())
    result.current = {
      ...result.current,
      pokes: pokesData,
      isLoadingPokes: false,
      errMsg: undefined,
    }
    expect(result.current.isLoadingPokes).toBe(false)
    expect(result.current.pokes).toEqual(pokesData)
    expect(result.current.errMsg).toBeUndefined()
  })
})

describe(pokesSelector, () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCreatePokeStore.getState.mockReturnValue({
      pokes: [{ name: "", url: "" }],
      isLoadingPokes: false,
      errMsg: undefined,
      actions: {
        fetchPokemonData: jest.fn(),
      },
    })
  })
  it("should select the individual state", () => {
    const pokes = pokesSelector(mockCreatePokeStore.getState())
    expect(pokes).toHaveLength(1)
  })
})
