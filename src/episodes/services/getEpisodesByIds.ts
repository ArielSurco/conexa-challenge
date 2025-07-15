import { ENV } from '@/shared/constants/env'

import { type Episode } from '../types/Episode'

type EpisodeResponse = Episode[]

export const getEpisodesByIds = async (ids: number[]): Promise<EpisodeResponse> => {
  const response = await fetch(`${ENV.API_URL}/api/episode/${ids.join(',')}`)

  const data = response.json() as Promise<EpisodeResponse>

  return data
}
