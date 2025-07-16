import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'
import { mockEpisode } from '@/episodes/testMocks/Episode'
import { type Episode } from '@/episodes/types/Episode'

import {
  getEpisodeIdByUrl,
  getIntersectionEpisodes,
  mapSelectedCharactersByEpisodesIds,
} from './homeUtils'

describe('getEpisodeIdByUrl', () => {
  it('should return the episode ID from the URL', () => {
    const url = 'https://rickandmortyapi.com/api/episode/1'
    const result = getEpisodeIdByUrl(url)

    expect(result).toBe(1)
  })
})

describe('mapSelectedCharactersByEpisodesIds', () => {
  it('should return an empty object if there are less than 2 selected characters', () => {
    const selectedCharacters: Record<string, Character> = {
      character1: mockCharacter,
    }

    const result = mapSelectedCharactersByEpisodesIds(selectedCharacters)

    expect(result).toEqual({})
  })

  it('should map character IDs with their episodes IDs', () => {
    const selectedCharacters: Record<string, Character> = {
      character1: {
        ...mockCharacter,
        id: 1,
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
          'https://rickandmortyapi.com/api/episode/3',
        ],
      },
      character2: {
        ...mockCharacter,
        id: 2,
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/4',
          'https://rickandmortyapi.com/api/episode/7',
        ],
      },
    }

    const result = mapSelectedCharactersByEpisodesIds(selectedCharacters)

    expect(result).toEqual({
      '1': [1, 2, 3],
      '2': [1, 4, 7],
    })
  })
})

describe('getIntersectionEpisodes', () => {
  it('should return the intersection of episodes', () => {
    const mockEpisode1: Episode = { ...mockEpisode, id: 1, name: 'Episode 1' }
    const mockEpisode2: Episode = { ...mockEpisode, id: 2, name: 'Episode 2' }
    const mockEpisode3: Episode = { ...mockEpisode, id: 3, name: 'Episode 3' }
    const mockEpisode4: Episode = { ...mockEpisode, id: 4, name: 'Episode 4' }
    const mockEpisode5: Episode = { ...mockEpisode, id: 5, name: 'Episode 5' }

    const character1Episodes: Episode[] = [mockEpisode1, mockEpisode2, mockEpisode3]
    const character2Episodes: Episode[] = [mockEpisode2, mockEpisode4, mockEpisode5]

    const result = getIntersectionEpisodes(character1Episodes, character2Episodes)

    expect(result).toEqual([mockEpisode2])
  })
})
