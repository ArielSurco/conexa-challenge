'use client'

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'

import { type Character } from '@/characters/types/Character'

interface SelectedCharactersContextValue {
  cleanSelectedCharacters: () => void
  getSelectedCharacter: (from: string) => Character | null
  selectCharacter: (from: string, character: Character) => void
  selectedCharacters: Record<string, Character>
}

interface SelectedCharactersProviderProps {
  children: ReactNode
}

const SelectedCharactersContext = createContext<SelectedCharactersContextValue | null>(null)

const defaultSelectedCharacters: Record<string, Character> = {}

export const SelectedCharactersProvider = ({ children }: SelectedCharactersProviderProps) => {
  const [selectedCharacters, setSelectedCharacters] =
    useState<Record<string, Character>>(defaultSelectedCharacters)

  const selectCharacter = useCallback((from: string, character: Character) => {
    setSelectedCharacters((prev) => ({ ...prev, [from]: character }))
  }, [])

  const getSelectedCharacter = useCallback(
    (from: string) => {
      return selectedCharacters[from]
    },
    [selectedCharacters],
  )

  const cleanSelectedCharacters = useCallback(() => {
    setSelectedCharacters(defaultSelectedCharacters)
  }, [])

  const contextValue = useMemo<SelectedCharactersContextValue>(
    () => ({
      getSelectedCharacter,
      selectCharacter,
      cleanSelectedCharacters,
      selectedCharacters,
    }),
    [getSelectedCharacter, selectCharacter, cleanSelectedCharacters, selectedCharacters],
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
