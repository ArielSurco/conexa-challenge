import { type Character } from '@/characters/types/Character'

// ? We expect the format https://rickandmortyapi.com/api/episode/1
const getEpisodeIdByUrl = (url: string) => {
  const episodeId = url.split('/').pop()

  return Number(episodeId)
}

const MINIMUM_SELECTED_CHARACTERS = 2

export const mapSelectedCharactersByEpisodesIds = (
  selectedCharacters: Record<string, Character>,
) => {
  const selectedCharactersValues = Object.values(selectedCharacters)

  const mappedEpisodesIdsByCharacterId: Record<string, number[]> = {}

  // ? Validation to avoid showing episodes section if there are less than 2 selected characters
  if (selectedCharactersValues.length < MINIMUM_SELECTED_CHARACTERS) {
    return mappedEpisodesIdsByCharacterId
  }

  selectedCharactersValues.forEach((character) => {
    mappedEpisodesIdsByCharacterId[character.id] = character.episode.map(getEpisodeIdByUrl)
  })

  return mappedEpisodesIdsByCharacterId
}
