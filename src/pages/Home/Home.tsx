import { CharactersSection } from '@/characters/components/CharactersSection/CharactersSection'
import { getAllCharacters } from '@/characters/services/getAllCharacters'

import styles from './Home.module.css'

export default async function Home() {
  const charactersResponse = await getAllCharacters()

  return (
    <>
      <h1>Conexa Challenge</h1>
      <div className={styles.charactersContainer}>
        <CharactersSection characters={charactersResponse.results} />
        <CharactersSection characters={charactersResponse.results} />
      </div>
    </>
  )
}
