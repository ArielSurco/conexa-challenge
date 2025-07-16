'use client'

import { createContext, type ReactNode, useContext, useMemo } from 'react'

import { getAllCharacters } from '@/characters/services/getAllCharacters'
import { type Character } from '@/characters/types/Character'
import { useCachedPagination } from '@/shared/hooks/useCachedPagination/useCachedPagination'

interface CachedCharactersContextValue {
  fetchCharacters: (page: number) => Promise<Character[]>
  totalPages: number
}

interface CachedCharactersProviderProps {
  children: ReactNode
  initialCharacters: Character[]
  initialPage: number
  initialTotalPages: number
}

const CachedCharactersContext = createContext<CachedCharactersContextValue | null>(null)

export const CachedCharactersProvider = ({
  children,
  initialPage,
  initialCharacters,
  initialTotalPages,
}: CachedCharactersContextProviderProps) => {
  const { cachedFetchData } = useCachedPagination({
    fetchData: (page) => getAllCharacters(page),
    getResults: (response) => response.results,
    initialData: {
      page: initialPage,
      data: initialCharacters,
    },
  })

  const contextValue = useMemo<CachedCharactersContextValue>(
    () => ({
      fetchCharacters: (page) => cachedFetchData(page),
      totalPages: initialTotalPages,
    }),
    [cachedFetchData, initialTotalPages],
  )

  return (
    <CachedCharactersContext.Provider value={contextValue}>
      {children}
    </CachedCharactersContext.Provider>
  )
}

export const useCachedCharacters = () => {
  const context = useContext(CachedCharactersContext)

  if (!context) {
    throw new Error('useCachedCharacters must be used within a CachedCharactersContext')
  }

  return context
}
