'use client'

import { useCallback, useEffect, useState } from 'react'

import { type Character } from '@/characters/types/Character'
import { getEpisodesByIds } from '@/episodes/services/getEpisodesByIds'
import { type Episode } from '@/episodes/types/Episode'

interface UseCharactersEpisodesParams {
  episodesIdsByCharacterId: Record<Character['id'], number[]>
}

export const useCharactersEpisodes = ({
  episodesIdsByCharacterId: episodeIdsParam,
}: UseCharactersEpisodesParams) => {
  const [isLoading, setIsLoading] = useState(false)
  const [episodesByCharacterId, setEpisodesByCharacterId] = useState<Record<string, Episode[]>>({})

  const mapEpisodesByCharacterId = useCallback(
    (episodes: Episode[]): Record<string, Episode[]> => {
      const newEpisodesByCharacterId: Record<string, Episode[]> = {}

      Object.entries(episodeIdsParam).forEach(([characterId, episodeIds]) => {
        newEpisodesByCharacterId[characterId] = episodes.filter((episode) =>
          episodeIds.includes(episode.id),
        )
      })

      return newEpisodesByCharacterId
    },
    [episodeIdsParam],
  )

  const getEpisodesByCharacterId = useCallback(
    (characterId?: string) => {
      return episodesByCharacterId[characterId ?? ''] ?? []
    },
    [episodesByCharacterId],
  )

  const fetchEpisodes = useCallback(async () => {
    setIsLoading(true)

    try {
      const episodeIds = Object.values(episodeIdsParam).flatMap((ids) => ids.map(Number))
      const noRepeatedEpisodeIds = [...new Set(episodeIds)]
      const episodes = await getEpisodesByIds(noRepeatedEpisodeIds)

      const newEpisodesByCharacterId = mapEpisodesByCharacterId(episodes)

      setEpisodesByCharacterId(newEpisodesByCharacterId)
    } catch (error) {
      // ? Maybe I should handle by an alert or something but because of time I'm just expecting to not have errors
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [episodeIdsParam, mapEpisodesByCharacterId])

  useEffect(() => {
    const hasEpisodesIds = Object.keys(episodeIdsParam).length > 0

    if (hasEpisodesIds) {
      void fetchEpisodes()
    }
  }, [episodeIdsParam, fetchEpisodes])

  return { episodesByCharacterId, getEpisodesByCharacterId, isLoading }
}
