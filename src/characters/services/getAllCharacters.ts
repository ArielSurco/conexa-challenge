import { getAllCharactersMockResponse } from '../serviceMocks/getAllCharactersMockResponse'
import { Character } from '../types/Character'

interface GetAllCharactersInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface GetAllCharactersParams {
  page?: number
  pageSize?: number
}

export interface GetAllCharactersResponse {
  info: GetAllCharactersInfo
  results: Character[]
}

export const getAllCharacters = (
  _params: GetAllCharactersParams = { page: 1, pageSize: 20 },
): Promise<GetAllCharactersResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllCharactersMockResponse)
    }, 2000)
  })
}
