/* eslint-disable @typescript-eslint/require-await */
import { act, render, screen } from '@testing-library/react'

import { CachedCharactersProvider } from '@/characters/context/CachedCharactersContext/CachedCharactersContext'
import {
  SelectedCharactersProvider,
  useSelectedCharacters,
} from '@/characters/context/SelectedCharactersContext/SelectedCharactersContext'
import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'

import Home, { SELECT_CHARACTER_SECTIONS } from './Home'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@/characters/context/SelectedCharactersContext/SelectedCharactersContext', () => ({
  ...jest.requireActual('@/characters/context/SelectedCharactersContext/SelectedCharactersContext'),
  useSelectedCharacters: jest.fn().mockReturnValue({
    getSelectedCharacter: jest.fn(),
    selectCharacter: jest.fn(),
    selectedCharacters: {},
  }),
}))

const mockUseSelectedCharacters = jest.mocked(useSelectedCharacters)

describe('Home', () => {
  it('should render just the two character sections if there are less than 2 selected characters', async () => {
    await act(async () => {
      render(<Home />, {
        wrapper: ({ children }) => (
          <CachedCharactersProvider initialCharacters={[]} initialPage={1} initialTotalPages={1}>
            <SelectedCharactersProvider>{children}</SelectedCharactersProvider>
          </CachedCharactersProvider>
        ),
      })
    })

    expect(screen.getByText('Character #1')).toBeInTheDocument()
    expect(screen.getByText('Character #2')).toBeInTheDocument()

    expect(screen.queryByText('Character #1 - Only Episodes')).not.toBeInTheDocument()
    expect(screen.queryByText('Character #2 - Only Episodes')).not.toBeInTheDocument()
    expect(screen.queryByText('Shared Episodes')).not.toBeInTheDocument()
  })

  it('should render episodes section when both characters are selected', async () => {
    const customMockCharacter: Character = { ...mockCharacter, id: 1, name: 'Test' }
    const customMockCharacter2: Character = { ...mockCharacter, id: 2, name: 'Test2' }

    mockUseSelectedCharacters.mockReturnValue({
      getSelectedCharacter: jest.fn().mockImplementation((sectionId) => {
        if (sectionId === SELECT_CHARACTER_SECTIONS.first) {
          return customMockCharacter
        }

        return customMockCharacter2
      }),
      selectCharacter: jest.fn(),
      selectedCharacters: {
        [SELECT_CHARACTER_SECTIONS.first]: customMockCharacter,
        [SELECT_CHARACTER_SECTIONS.second]: customMockCharacter2,
      },
    })

    render(<Home />, {
      wrapper: ({ children }) => (
        <CachedCharactersProvider
          initialCharacters={[customMockCharacter, customMockCharacter2]}
          initialPage={1}
          initialTotalPages={1}
        >
          <SelectedCharactersProvider>{children}</SelectedCharactersProvider>
        </CachedCharactersProvider>
      ),
    })

    expect(screen.getByText('Character #1 - Only Episodes')).toBeInTheDocument()
    expect(screen.getByText('Character #2 - Only Episodes')).toBeInTheDocument()
    expect(screen.getByText('Characters #1 & #2 - Shared Episodes')).toBeInTheDocument()
  })
})
