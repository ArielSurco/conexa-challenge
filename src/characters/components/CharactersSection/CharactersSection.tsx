'use client'

import { type ComponentProps, useEffect, useState } from 'react'

import { useCachedCharacters } from '@/characters/context/CachedCharactersContext/CachedCharactersContext'
import { type Character } from '@/characters/types/Character'
import { Button } from '@/shared/components/atoms/Button/Button'
import { Skeleton } from '@/shared/components/atoms/Skeleton/Skeleton'
import { Title } from '@/shared/components/atoms/Title/Title'
import { Pagination } from '@/shared/components/molecules/Pagination/Pagination'
import { cn } from '@/shared/utils/cn'

import { CharacterPreviewCard } from '../CharacterPreviewCard/CharacterPreviewCard'

import styles from './CharactersSection.module.css'
import { CharactersSectionListSkeletonTemplate } from './CharactersSectionListSkeletonTemplate'

interface CharactersSectionProps extends Pick<ComponentProps<'section'>, 'id'> {
  disabledCharacterIds?: Character['id'][]
  onSelectCharacter: (character: Character) => void
  selectedCharacterId: Character['id'] | null
  title: string
}

const isCharacterDisabled = (
  character: Character,
  disabledCharacterIds: Character['id'][],
  selectedCharacterId: Character['id'] | null,
) => {
  return Boolean(
    disabledCharacterIds.includes(character.id) && selectedCharacterId !== character.id,
  )
}

export function CharactersSection({
  selectedCharacterId,
  onSelectCharacter,
  disabledCharacterIds = [],
  title,
  id,
}: CharactersSectionProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { fetchCharacters, totalPages } = useCachedCharacters()

  const handlePageChange = async (page: number) => {
    try {
      setIsLoading(true)
      const characters = await fetchCharacters(page)

      setCharacters(characters)
      setCurrentPage(page)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void handlePageChange(currentPage)
  }, [])

  return (
    <section className={styles.charactersSection} id={id}>
      <Title fontSize='1.5rem' headingLevel='h2'>
        {title}
      </Title>
      <Skeleton isLoading={isLoading} template={<CharactersSectionListSkeletonTemplate />}>
        <div className={styles.charactersList}>
          {characters.map((character) => (
            <Button
              className={cn(
                isCharacterDisabled(character, disabledCharacterIds, selectedCharacterId) &&
                  styles.disabledCharacter,
              )}
              disabled={isCharacterDisabled(character, disabledCharacterIds, selectedCharacterId)}
              key={character.id}
              onClick={() => onSelectCharacter(character)}
              variant='unstyled'
            >
              <CharacterPreviewCard
                character={character}
                className={cn(selectedCharacterId === character.id && styles.selectedCard)}
                key={character.id}
              />
            </Button>
          ))}
        </div>
      </Skeleton>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => void handlePageChange(page)}
        totalPages={totalPages}
      />
    </section>
  )
}
