import { logger } from "@/store/middleware/logMiddleware"
import { usePokeStore } from "@/store/pokeStore"
import { renderHook } from "@testing-library/react"
import { mock, MockProxy } from "jest-mock-extended"
import { act } from "react-dom/test-utils"
const mockCreatePokeStore: MockProxy<typeof usePokeStore> =
  mock<typeof usePokeStore>()

describe(logger, () => {
  let logSpy: jest.SpyInstance
  let fetchMock: jest.Mock
  beforeEach(() => {
    jest.clearAllMocks()
    logSpy = jest.spyOn(console, "log")
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
    mockCreatePokeStore.getState.mockRestore()
    logSpy.mockReset()
    fetchMock.mockReset()
  })
  it("should log and perform state update", async () => {
    const pokesData = {
      results: [{ name: "", url: "" }],
    }
    fetchMock = jest.fn().mockImplementation(
      () =>
        ({
          json: jest.fn().mockResolvedValue(pokesData),
        } as any)
    )
    global.fetch = fetchMock
    const { result } = renderHook(() => usePokeStore())
    expect(result.current.pokes).toHaveLength(0)
    await act(async () => {
      await result.current.actions.fetchPokemonData()
    })
    expect(global.fetch).toHaveBeenCalled()

    expect(logSpy).toHaveBeenCalledWith({
      currentState: {
        ...mockCreatePokeStore.getState(),
        actions: expect.any(Object),
      },
    })
    expect(logSpy).toHaveBeenCalledWith("Applying args - ", {
      isLoadingPokes: false,
      pokes: pokesData.results,
    })
    expect(logSpy).toHaveBeenCalledWith({
      newState: result.current,
    })
    expect(result.current.pokes).toHaveLength(1)
  })
})
