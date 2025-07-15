'use client'

import { useMemo } from 'react'

import { CharactersSection } from '@/characters/components/CharactersSection/CharactersSection'
import { useSelectedCharacters } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'

import styles from './Home.module.css'

export default function Home() {
  const { getSelectedCharacter, selectCharacter, selectedCharacters } = useSelectedCharacters()

  const disabledCharacterIds = useMemo(() => {
    return Object.values(selectedCharacters).map((character) => character.id)
  }, [selectedCharacters])

  return (
    <>
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
    </>
  )
}
