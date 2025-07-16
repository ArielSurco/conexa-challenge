import { ENV } from '@/shared/constants/env'

import { getAllCharacters, type GetAllCharactersResponse } from './getAllCharacters'

jest.mock('@/shared/constants/env', () => ({
  ENV: {
    API_URL: 'https://example.com/api',
  },
}))

describe('getAllCharacters', () => {
  let fetchSpy: jest.SpyInstance

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call with page as query param', async () => {
    const mockResponse: GetAllCharactersResponse = {
      info: {
        count: 826,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        pages: 42,
        prev: null,
      },
      results: [],
    }

    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as Response)

    const result = await getAllCharacters(1)

    expect(fetchSpy).toHaveBeenCalledWith(`${ENV.API_URL}/api/character?page=1`)
    expect(result).toEqual(mockResponse)
  })
})
