import { render, screen } from '@testing-library/react'

import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'

import { CharactersSection } from './CharactersSection'

describe('CharactersSection', () => {
  it('should render provided characters', () => {
    const customMockCharacters: Character[] = [
      { ...mockCharacter, id: 1, name: 'Rick Sanchez' },
      { ...mockCharacter, id: 2, name: 'Morty Smith' },
    ]

    render(<CharactersSection characters={customMockCharacters} />)

    const characters = screen.getAllByRole('article')

    expect(characters).toHaveLength(customMockCharacters.length)
    expect(characters[0]).toHaveTextContent(customMockCharacters[0].name)
    expect(characters[1]).toHaveTextContent(customMockCharacters[1].name)
  })
})
