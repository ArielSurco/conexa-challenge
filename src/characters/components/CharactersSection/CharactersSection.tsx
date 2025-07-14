import { type Character } from '@/characters/types/Character'

import { CharacterPreviewCard } from '../CharacterPreviewCard/CharacterPreviewCard'

import styles from './CharactersSection.module.css'

interface CharactersSectionProps {
  characters: Character[]
}

export function CharactersSection({ characters }: CharactersSectionProps) {
  return (
    <section>
      <h2>Character #1</h2>
      <div className={styles.characterSection}>
        {characters.map((character) => (
          <CharacterPreviewCard character={character} key={character.id} />
        ))}
      </div>
    </section>
  )
}
