'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { CharactersSection } from '@/characters/components/CharactersSection/CharactersSection'
import { useSelectedCharacters } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'
import { type Character } from '@/characters/types/Character'
import { EpisodesList } from '@/episodes/components/EpisodesList/EpisodesList'
import { useCharactersEpisodes } from '@/episodes/hooks/useCharactersEpisodes/useCharactersEpisodes'
import { Title } from '@/shared/components/atoms/Title/Title'

import styles from './Home.module.css'
import { getIntersectionEpisodes, mapSelectedCharactersByEpisodesIds } from './homeUtils'

export const SELECT_CHARACTER_SECTIONS = {
  first: 'character-1',
  second: 'character-2',
}

export default function Home() {
  const { getSelectedCharacter, selectCharacter, selectedCharacters } = useSelectedCharacters()
  const router = useRouter()

  const disabledCharacterIds = useMemo(() => {
    return Object.values(selectedCharacters).map((character) => character.id)
  }, [selectedCharacters])

  const episodesIdsByCharacterId = useMemo<Record<string, number[]>>(
    () => mapSelectedCharactersByEpisodesIds(selectedCharacters),
    [selectedCharacters],
  )

  const { getEpisodesByCharacterId, isLoading: isLoadingEpisodes } = useCharactersEpisodes({
    episodesIdsByCharacterId,
  })

  const character1Episodes = useMemo(() => {
    return getEpisodesByCharacterId(String(getSelectedCharacter('character-1')?.id))
  }, [getEpisodesByCharacterId, getSelectedCharacter])

  const character2Episodes = useMemo(() => {
    return getEpisodesByCharacterId(String(getSelectedCharacter('character-2')?.id))
  }, [getEpisodesByCharacterId, getSelectedCharacter])

  const handleSelectCharacter = (
    character: Character,
    sectionId: (typeof SELECT_CHARACTER_SECTIONS)[keyof typeof SELECT_CHARACTER_SECTIONS],
  ) => {
    selectCharacter(sectionId, character)

    // Focus on the next section based on selection
    const interpolator = {
      [SELECT_CHARACTER_SECTIONS.first]: SELECT_CHARACTER_SECTIONS.second,
      [SELECT_CHARACTER_SECTIONS.second]: SELECT_CHARACTER_SECTIONS.first,
    }

    if (getSelectedCharacter(interpolator[sectionId])) {
      router.push('#shared-episodes')
    } else {
      router.push(`#${interpolator[sectionId]}`)
    }
  }

  return (
    <div className={styles.homeContainer}>
      <Title fontSize='2rem' headingLevel='h1'>
        Conexa Challenge
      </Title>
      <div className={styles.charactersContainer}>
        <CharactersSection
          disabledCharacterIds={disabledCharacterIds}
          id={SELECT_CHARACTER_SECTIONS.first}
          onSelectCharacter={(character) =>
            handleSelectCharacter(character, SELECT_CHARACTER_SECTIONS.first)
          }
          selectedCharacterId={getSelectedCharacter(SELECT_CHARACTER_SECTIONS.first)?.id ?? null}
          title='Character #1'
        />
        <CharactersSection
          disabledCharacterIds={disabledCharacterIds}
          id={SELECT_CHARACTER_SECTIONS.second}
          onSelectCharacter={(character) =>
            handleSelectCharacter(character, SELECT_CHARACTER_SECTIONS.second)
          }
          selectedCharacterId={getSelectedCharacter(SELECT_CHARACTER_SECTIONS.second)?.id ?? null}
          title='Character #2'
        />
      </div>
      {getSelectedCharacter('character-1') && getSelectedCharacter('character-2') && (
        <div className={styles.episodesContainer}>
          <EpisodesList
            episodes={character1Episodes}
            id='character-1-episodes'
            isLoading={isLoadingEpisodes}
            title='Character #1 - Only Episodes'
          />
          <EpisodesList
            episodes={getIntersectionEpisodes(character1Episodes, character2Episodes)}
            id='shared-episodes'
            isLoading={isLoadingEpisodes}
            title='Characters #1 & #2 - Shared Episodes'
          />
          <EpisodesList
            episodes={character2Episodes}
            id='character-2-episodes'
            isLoading={isLoadingEpisodes}
            title='Character #2 - Only Episodes'
          />
        </div>
      )}
    </div>
  )
}
