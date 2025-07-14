import { mockCharacter } from '@/characters/testMocks/characterMock'
import { Character } from '@/characters/types/Character'
import { capitalize } from '@/shared/utils/capitalize'
import { render, screen } from '@testing-library/react'
import { CharacterPreviewCard } from './CharacterPreviewCard'

describe('CharactersPreviewCard', () => {
  it('should render the character name as a capitalized title', () => {
    const customMockCharacter: Character = { ...mockCharacter, name: 'rick sanchez' }

    render(<CharacterPreviewCard character={customMockCharacter} />)

    const characterName = screen.getByRole('heading', {
      name: capitalize(customMockCharacter.name),
    })

    expect(characterName).toBeInTheDocument()
  })

  it('should capitalize status and species', () => {
    const customMockCharacter: Character = { ...mockCharacter, status: 'unknown', species: 'human' }

    render(<CharacterPreviewCard character={customMockCharacter} />)

    const status = screen.getByText(capitalize(customMockCharacter.status))
    const species = screen.getByText(capitalize(customMockCharacter.species))

    expect(status).toBeInTheDocument()
    expect(species).toBeInTheDocument()
  })

  it('should provide an alt text for the image', () => {
    render(<CharacterPreviewCard character={mockCharacter} />)

    expect(screen.getByRole('img', { name: mockCharacter.name })).toHaveAttribute(
      'alt',
      mockCharacter.name,
    )
  })
})
