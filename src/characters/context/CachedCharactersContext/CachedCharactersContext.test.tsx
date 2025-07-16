import { act, renderHook } from '@testing-library/react'

import { mockCharacter } from '@/characters/testMocks/characterMock'
import { type Character } from '@/characters/types/Character'

import { CachedCharactersProvider, useCachedCharacters } from './CachedCharactersContext'

jest.mock('@/shared/hooks/useCachedPagination/useCachedPagination', () => ({
  useCachedPagination: jest.fn().mockReturnValue({
    cachedData: new Map(),
    cachedFetchData: jest.fn(),
  }),
}))

describe('CachedCharactersContext', () => {
  it('should throw error if useCachedCharacters is used outside the provider', () => {
    let error: Error | undefined

    try {
      renderHook(useCachedCharacters)
    } catch (e: unknown) {
      error = e as Error
    }

    expect(error?.message).toBe('useCachedCharacters must be used within a CachedCharactersContext')
  })

  it('should provide the fetchCharacters function and the totalPages values', async () => {
    const customMockCharacter: Character = { ...mockCharacter, name: 'Test' }

    const { result } = renderHook(() => useCachedCharacters(), {
      wrapper: ({ children }) => (
        <CachedCharactersProvider
          initialCharacters={[customMockCharacter]}
          initialPage={1}
          initialTotalPages={1}
        >
          {children}
        </CachedCharactersProvider>
      ),
    })

    const fetchCharactersSpy = jest.spyOn(result.current, 'fetchCharacters')

    await act(async () => {
      await result.current.fetchCharacters(1)
    })

    expect(fetchCharactersSpy).toHaveBeenCalledWith(1)
    expect(result.current.totalPages).toBe(1)
  })
})
