'use client'

import { type Character } from '@/characters/types/Character'
import { Button } from '@/shared/components/atoms/Button/Button'
import { cn } from '@/shared/utils/cn'

import { CharacterPreviewCard } from '../CharacterPreviewCard/CharacterPreviewCard'

import styles from './CharactersSection.module.css'

interface CharactersSectionProps {
  characters: Character[]
  disabledCharacterIds?: Character['id'][]
  onSelectCharacter: (character: Character) => void
  selectedCharacterId: Character['id'] | null
}

const isCharacterDisabled = (
  character: Character,
  disabledCharacterIds: Character['id'][],
  selectedCharacterId: Character['id'] | null,
) => {
  return Boolean(
    disabledCharacterIds.includes(character.id) && selectedCharacterId !== character.id,
  )
}

export function CharactersSection({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  disabledCharacterIds = [],
}: CharactersSectionProps) {
  return (
    <section>
      <h2>Character #1</h2>
      <div className={styles.charactersSection}>
        {characters.map((character) => (
          <Button
            className={cn(
              isCharacterDisabled(character, disabledCharacterIds, selectedCharacterId) &&
                styles.disabledCharacter,
            )}
            disabled={isCharacterDisabled(character, disabledCharacterIds, selectedCharacterId)}
            key={character.id}
            onClick={() => onSelectCharacter(character)}
            variant='unstyled'
          >
            <CharacterPreviewCard
              character={character}
              className={cn(selectedCharacterId === character.id && styles.selectedCard)}
              key={character.id}
            />
          </Button>
        ))}
      </div>
    </section>
  )
}
