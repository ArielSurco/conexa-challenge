import { ENV } from '@/shared/constants/env'

import { mockEpisode } from '../testMocks/Episode'

import { getEpisodesByIds } from './getEpisodesByIds'

jest.mock('@/shared/constants/env', () => ({
  ENV: {
    API_URL: 'https://example.com/api',
  },
}))

describe('getEpisodesByIds', () => {
  let fetchSpy: jest.SpyInstance

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call with ids as query param', async () => {
    const mockResponse = [mockEpisode]

    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as Response)

    const result = await getEpisodesByIds([1, 2, 3, 7])

    expect(fetchSpy).toHaveBeenCalledWith(`${ENV.API_URL}/api/episode/1,2,3,7`)
    expect(result).toEqual(mockResponse)
  })
})
