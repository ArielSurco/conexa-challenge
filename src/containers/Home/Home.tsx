'use client'

import { useMemo } from 'react'

import { CharactersSection } from '@/characters/components/CharactersSection/CharactersSection'
import { useSelectedCharacters } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'
import { EpisodesList } from '@/episodes/components/EpisodesList/EpisodesList'
import { useCharactersEpisodes } from '@/episodes/hooks/useCharactersEpisodes/useCharactersEpisodes'

import styles from './Home.module.css'
import { mapSelectedCharactersByEpisodesIds } from './homeUtils'

export default function Home() {
  const { getSelectedCharacter, selectCharacter, selectedCharacters } = useSelectedCharacters()

  const disabledCharacterIds = useMemo(() => {
    return Object.values(selectedCharacters).map((character) => character.id)
  }, [selectedCharacters])

  const episodesIdsByCharacterId = useMemo<Record<string, number[]>>(
    () => mapSelectedCharactersByEpisodesIds(selectedCharacters),
    [selectedCharacters],
  )

  const { getEpisodesByCharacterId } = useCharactersEpisodes({
    episodesIdsByCharacterId,
  })

  const character1Episodes = useMemo(() => {
    return getEpisodesByCharacterId(String(getSelectedCharacter('character-1')?.id))
  }, [getEpisodesByCharacterId, getSelectedCharacter])

  const character2Episodes = useMemo(() => {
    return getEpisodesByCharacterId(String(getSelectedCharacter('character-2')?.id))
  }, [getEpisodesByCharacterId, getSelectedCharacter])

  const intersectionEpisodes = useMemo(() => {
    return character1Episodes.filter((episode) => character2Episodes.includes(episode))
  }, [character1Episodes, character2Episodes])

  return (
    <div className={styles.homeContainer}>
      <h1>Conexa Challenge</h1>
      <div className={styles.charactersContainer}>
        <CharactersSection
          disabledCharacterIds={disabledCharacterIds}
          onSelectCharacter={(character) => selectCharacter('character-1', character)}
          selectedCharacterId={getSelectedCharacter('character-1')?.id ?? null}
          title='Character #1'
        />
        <CharactersSection
          disabledCharacterIds={disabledCharacterIds}
          onSelectCharacter={(character) => selectCharacter('character-2', character)}
          selectedCharacterId={getSelectedCharacter('character-2')?.id ?? null}
          title='Character #2'
        />
      </div>
      {getSelectedCharacter('character-1') && getSelectedCharacter('character-2') && (
        <div className={styles.episodesContainer}>
          <EpisodesList episodes={character1Episodes} title='Character #1 - Only Episodes' />
          <EpisodesList
            episodes={intersectionEpisodes}
            title='Characters #1 & #2 - Shared Episodes'
          />
          <EpisodesList episodes={character2Episodes} title='Character #2 - Only Episodes' />
        </div>
      )}
    </div>
  )
}
