import { CachedCharactersContextProvider } from '@/characters/context/CachedCharactersContext/CachedCharactersContext'
import { SelectedCharactersProvider } from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'
import { getAllCharacters } from '@/characters/services/getAllCharacters'
import HomePage from '@/containers/Home/Home'

const INITIAL_PAGE = 1

export default async function Page() {
  const charactersResponse = await getAllCharacters(INITIAL_PAGE)

  return (
    <CachedCharactersContextProvider
      initialCharacters={charactersResponse.results}
      initialPage={INITIAL_PAGE}
      initialTotalPages={charactersResponse.info.pages}
    >
      <SelectedCharactersProvider>
        <HomePage />
      </SelectedCharactersProvider>
    </CachedCharactersContextProvider>
  )
}
