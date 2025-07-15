import { ENV } from '@/shared/constants/env'

import { type Character } from '../types/Character'

interface GetAllCharactersInfo {
  count: number
  next: string | null
  pages: number
  prev: string | null
}

export interface GetAllCharactersResponse {
  info: GetAllCharactersInfo
  results: Character[]
}

export const getAllCharacters = async (page: number): Promise<GetAllCharactersResponse> => {
  const response = await fetch(`${ENV.API_URL}/api/character?page=${String(page)}`, {
    next: { revalidate: 0 },
  })

  const data = response.json() as Promise<GetAllCharactersResponse>

  return data
}
