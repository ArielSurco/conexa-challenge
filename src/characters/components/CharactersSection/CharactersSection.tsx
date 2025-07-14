import { Character } from '@/characters/types/Character'

import { CharacterPreviewCard } from '../CharacterPreviewCard/CharacterPreviewCard'
import styles from './CharactersSection.module.css'

interface CharactersSectionProps {
  characters: Character[]
}

export const CharactersSection = ({ characters }: CharactersSectionProps) => {
  return (
    <section>
      <h2>Character #1</h2>
      <div className={styles.characterSection}>
        {characters.map((character) => (
          <CharacterPreviewCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  )
}
