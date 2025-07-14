import { CharacterPreviewCard } from '@/characters/components/CharacterPreviewCard/CharacterPreviewCard'
import { getAllCharacters } from '@/characters/services/getAllCharacters'
import styles from './Home.module.css'

export const Home = async () => {
  const characters = await getAllCharacters()

  return (
    <>
      <h1>Conexa Challenge</h1>
      <div className={styles.charactersContainer}>
        <section>
          <h2>Character #1</h2>
          <div className={styles.characterSection}>
            {characters.results.map((character) => (
              <CharacterPreviewCard key={character.id} character={character} />
            ))}
          </div>
        </section>
        <section>
          <h2>Character #1</h2>
          <div className={styles.characterSection}>
            {characters.results.map((character) => (
              <CharacterPreviewCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
