'use client'

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'

import { type Character } from '@/characters/types/Character'

interface SelectedCharactersContextValue {
  characters: Character[]
  cleanSelectedCharacters: () => void
  getAllSelectedCharacterIds: () => Character['id'][]
  getSelectedCharacter: (from: string) => Character | null
  selectCharacter: (from: string, character: Character) => void
  setCharacters: (characters: Character[]) => void
}

interface SelectedCharactersProviderProps {
  children: ReactNode
  initialCharacters: Character[]
}

const SelectedCharactersContext = createContext<SelectedCharactersContextValue | null>(null)

const defaultSelectedCharacters: Record<string, Character['id']> = {}

export const SelectedCharactersProvider = ({
  children,
  initialCharacters,
}: SelectedCharactersProviderProps) => {
  const [selectedCharacters, setSelectedCharacters] =
    useState<Record<string, Character['id']>>(defaultSelectedCharacters)

  const [characters, setCharacters] = useState<Character[]>(initialCharacters)

  const selectCharacter = useCallback((from: string, character: Character) => {
    setSelectedCharacters((prev) => ({ ...prev, [from]: character.id }))
  }, [])

  const getSelectedCharacter = useCallback(
    (from: string) => {
      const characterId = selectedCharacters[from]

      if (!characterId) return null

      return characters.find((character) => character.id === characterId) ?? null
    },
    [characters, selectedCharacters],
  )

  const cleanSelectedCharacters = useCallback(() => {
    setSelectedCharacters(defaultSelectedCharacters)
  }, [])

  const getAllSelectedCharacterIds = useCallback(() => {
    return Object.values(selectedCharacters)
  }, [selectedCharacters])

  const contextValue = useMemo<SelectedCharactersContextValue>(
    () => ({
      getSelectedCharacter,
      selectCharacter,
      cleanSelectedCharacters,
      characters,
      setCharacters,
      getAllSelectedCharacterIds,
    }),
    [
      getSelectedCharacter,
      selectCharacter,
      cleanSelectedCharacters,
      characters,
      setCharacters,
      getAllSelectedCharacterIds,
    ],
  )

  return (
    <SelectedCharactersContext.Provider value={contextValue}>
      {children}
    </SelectedCharactersContext.Provider>
  )
}

export const useSelectedCharacters = () => {
  const context = useContext(SelectedCharactersContext)

  if (!context) {
    throw new Error('useSelectedCharacters must be used within a SelectedCharactersProvider')
  }

  return context
}
