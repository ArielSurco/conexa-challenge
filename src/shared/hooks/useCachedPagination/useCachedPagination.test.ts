import { renderHook } from '@testing-library/react'

import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'

import { useCachedPagination } from './useCachedPagination'

describe('useCachedPagination', () => {
  it('should not call fetchData if page has already been fetched', async () => {
    const mockResponseFetchData: Character[] = [
      { ...mockCharacter, id: 1, name: 'Rick' },
      { ...mockCharacter, id: 2, name: 'Morty' },
    ]

    const fetchData = jest.fn().mockResolvedValue({ data: mockResponseFetchData })
    const getResults = jest.fn().mockReturnValue(mockResponseFetchData)
    const initialData = { page: 1, data: mockResponseFetchData }

    const { result } = renderHook(() =>
      useCachedPagination({
        fetchData,
        getResults,
        initialData,
      }),
    )

    const { cachedData, cachedFetchData } = result.current

    const data = await cachedFetchData(2)

    expect(data).toEqual(mockResponseFetchData)
    expect(cachedData.current.get(2)).toEqual(mockResponseFetchData)
    expect(fetchData).toHaveBeenCalledWith(2)

    jest.clearAllMocks()

    const samePageData = await cachedFetchData(2)

    expect(samePageData).toEqual(mockResponseFetchData)
    expect(cachedData.current.get(2)).toEqual(mockResponseFetchData)
    expect(fetchData).not.toHaveBeenCalled()
  })

  it('should not call fetchData if is the initial page', async () => {
    const fetchData = jest.fn().mockResolvedValue({ data: mockCharacter })
    const getResults = jest.fn().mockReturnValue(mockCharacter)
    const initialData = { page: 1, data: [mockCharacter] }

    const { result } = renderHook(() =>
      useCachedPagination({
        fetchData,
        getResults,
        initialData,
      }),
    )

    const { cachedData, cachedFetchData } = result.current

    const data = await cachedFetchData(1)

    expect(data).toEqual([mockCharacter])
    expect(cachedData.current.get(1)).toEqual([mockCharacter])
    expect(fetchData).not.toHaveBeenCalled()
  })
})
