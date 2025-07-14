import { type CharacterLocation } from './CharacterLocation'

export interface Character {
  created: string
  episode: string[]
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  id: number
  image: string
  location: CharacterLocation
  name: string
  origin: CharacterLocation
  species: string
  status: 'Alive' | 'Dead' | 'unknown'
  type: string
  url: string
}
