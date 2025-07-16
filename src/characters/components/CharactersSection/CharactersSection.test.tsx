/* eslint-disable @typescript-eslint/require-await */
import { act } from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
    totalPages: 10,
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

  it('should fetch characters with the first page when the component is mounted', async () => {
    render(
      <CharactersSection onSelectCharacter={jest.fn()} selectedCharacterId={null} title='Test' />,
    )

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith(1)
    })
  })

  it('should fetch characters on each page change', async () => {
    render(
      <CharactersSection onSelectCharacter={jest.fn()} selectedCharacterId={null} title='Test' />,
    )

    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' })

    act(() => {
      fireEvent.click(nextPageButton)
    })

    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith(2)
    })
  })

  it('should disable a character if its id is included in the disabledCharacterIds prop and is not the selected character', async () => {
    await act(async () => {
      render(
        <CharactersSection
          disabledCharacterIds={[customMockCharacters[1].id]}
          onSelectCharacter={jest.fn()}
          selectedCharacterId={null}
          title='Test'
        />,
      )
    })

    const characterCard = screen.getByRole('button', {
      name: `Select ${customMockCharacters[1].name}`,
    })

    expect(characterCard).toBeDisabled()
  })

  it('should not disabled a selected character even if its id is included in the disabledCharacterIds prop', async () => {
    await act(async () => {
      render(
        <CharactersSection
          disabledCharacterIds={[customMockCharacters[1].id]}
          onSelectCharacter={jest.fn()}
          selectedCharacterId={customMockCharacters[1].id}
          title='Test'
        />,
      )
    })

    const characterCard = screen.getByRole('button', {
      name: `Select ${customMockCharacters[1].name}`,
    })

    expect(characterCard).not.toBeDisabled()
  })

  it('should call the onSelectCharacter prop with the character data when a character card is clicked', async () => {
    const onSelectCharacter = jest.fn()

    await act(async () => {
      render(
        <CharactersSection
          onSelectCharacter={onSelectCharacter}
          selectedCharacterId={null}
          title='Test'
        />,
      )
    })

    const characterCard = screen.getByRole('button', {
      name: `Select ${customMockCharacters[0].name}`,
    })

    await act(async () => {
      fireEvent.click(characterCard)
    })

    expect(onSelectCharacter).toHaveBeenCalledWith(customMockCharacters[0])
  })

  it('should render a skeleton if the characters are loading', async () => {
    // ? Without act because the useEffect triggers the setLoading(true) on first fetch
    render(
      <CharactersSection onSelectCharacter={jest.fn()} selectedCharacterId={null} title='Test' />,
    )

    expect(screen.getByTestId('characters-section-skeleton')).toBeInTheDocument()

    // ? In some point the skeleton disappears because the characters are fetched and settled setLoading(false)
    await waitFor(() => {
      expect(screen.queryByTestId('characters-section-skeleton')).not.toBeInTheDocument()
    })
  })
})
