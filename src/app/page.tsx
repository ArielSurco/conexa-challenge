import { SelectedCharactersProvider } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'
import { getAllCharacters } from '@/characters/services/getAllCharacters'
import HomePage from '@/pages/Home/Home'

export default async function Page() {
  const charactersResponse = await getAllCharacters()

  return (
    <SelectedCharactersProvider initialCharacters={charactersResponse.results}>
      <HomePage />
    </SelectedCharactersProvider>
  )
}
