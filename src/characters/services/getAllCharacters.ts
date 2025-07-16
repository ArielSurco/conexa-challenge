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
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch(`${ENV.API_URL}/api/character?page=${String(page)}`)

  const data = response.json() as Promise<GetAllCharactersResponse>

  return data
}
