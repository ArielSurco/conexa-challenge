import { act, renderHook } from '@testing-library/react'

import { mockCharacter } from '@/characters/testMocks/characterMock'

import { SelectedCharactersProvider, useSelectedCharacters } from './SelectedCharactersContext'

describe('SelectedCharactersContext', () => {
  it('should throw an error if useSelectedCharacters is used outside the provider', () => {
    let error: Error | undefined

    try {
      renderHook(useSelectedCharacters)
    } catch (e: unknown) {
      error = e as Error
    }

    expect(error?.message).toBe(
      'useSelectedCharacters must be used within a SelectedCharactersProvider',
    )
  })

  it('should update selectedCharacters when selectCharacter is called', () => {
    const { result } = renderHook(useSelectedCharacters, {
      wrapper: SelectedCharactersProvider,
    })

    expect(result.current.selectedCharacters).toEqual({})

    act(() => {
      result.current.selectCharacter('test', mockCharacter)
    })

    expect(result.current.selectedCharacters).toEqual({
      test: mockCharacter,
    })
  })

  it('should return the correct character for a given key', () => {
    const { result } = renderHook(useSelectedCharacters, {
      wrapper: SelectedCharactersProvider,
    })

    act(() => {
      result.current.selectCharacter('test', mockCharacter)
    })

    expect(result.current.getSelectedCharacter('test')).toEqual(mockCharacter)
  })

  it('should allow to select multiple characters', () => {
    const customMockCharacter = { ...mockCharacter, name: 'Test' }
    const customMockCharacter2 = { ...mockCharacter, name: 'Test2' }

    const { result } = renderHook(useSelectedCharacters, {
      wrapper: SelectedCharactersProvider,
    })

    act(() => {
      result.current.selectCharacter('test', customMockCharacter)
      result.current.selectCharacter('test2', customMockCharacter2)
    })

    expect(result.current.selectedCharacters).toEqual({
      test: customMockCharacter,
      test2: customMockCharacter2,
    })
  })
})
