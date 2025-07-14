'use client'

import { CharactersSection } from '@/characters/components/CharactersSection/CharactersSection'
import { useSelectedCharacters } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'

import styles from './Home.module.css'

export default function Home() {
  const { characters, getSelectedCharacter, selectCharacter, getAllSelectedCharacterIds } =
    useSelectedCharacters()

  const disabledCharacterIds = getAllSelectedCharacterIds()

  return (
    <>
      <h1>Conexa Challenge</h1>
      <div className={styles.charactersContainer}>
        <CharactersSection
          characters={characters}
          disabledCharacterIds={disabledCharacterIds}
          onSelectCharacter={(character) => selectCharacter('character-1', character)}
          selectedCharacterId={getSelectedCharacter('character-1')?.id ?? null}
        />
        <CharactersSection
          characters={characters}
          disabledCharacterIds={disabledCharacterIds}
          onSelectCharacter={(character) => selectCharacter('character-2', character)}
          selectedCharacterId={getSelectedCharacter('character-2')?.id ?? null}
        />
      </div>
    </>
  )
}
