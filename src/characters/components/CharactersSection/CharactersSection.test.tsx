import { render, screen, waitFor } from '@testing-library/react'

import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'

import { CharactersSection } from './CharactersSection'

const customMockCharacters: Character[] = [
  { ...mockCharacter, id: 1, name: 'Rick Sanchez' },
  { ...mockCharacter, id: 2, name: 'Morty Smith' },
]

const mockFetchCharacters = jest.fn().mockResolvedValue(customMockCharacters)

jest.mock('@/characters/context/CachedCharactersContext/CachedCharactersContext', () => ({
  useCachedCharacters: () => ({
    fetchCharacters: mockFetchCharacters,
    totalPages: 1,
  }),
}))

describe('CharactersSection', () => {
  it('should render provided characters', async () => {
    render(
      <CharactersSection onSelectCharacter={jest.fn()} selectedCharacterId={null} title='Test' />,
    )

    await waitFor(() => {
      expect(screen.getByText(customMockCharacters[0].name)).toBeInTheDocument()
      expect(screen.getByText(customMockCharacters[1].name)).toBeInTheDocument()
    })

    expect(mockFetchCharacters).toHaveBeenCalledWith(1)
  })
})
