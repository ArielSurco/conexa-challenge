import Image from 'next/image'
import { type ComponentProps } from 'react'

import { type Character } from '@/characters/types/Character'
import { Card } from '@/shared/components/atoms/Card/Card'
import { StatusPoint } from '@/shared/components/atoms/StatusPoint/StatusPoint'
import { Title } from '@/shared/components/atoms/Title/Title'
import { capitalize } from '@/shared/utils/capitalize'
import { cn } from '@/shared/utils/cn'

import styles from './CharacterPreviewCard.module.css'

interface CharacterPreviewCardProps extends ComponentProps<'article'> {
  character: Character
}

export const statusPointColors: Record<Character['status'], string> = {
  Alive: '#00ff9d',
  Dead: '#ff005d',
  unknown: '#cccccc',
}

export function CharacterPreviewCard({
  character,
  className,
  ...props
}: CharacterPreviewCardProps) {
  return (
    <Card className={cn(styles.characterCard, className)} {...props}>
      <Image
        alt={character.name}
        className={styles.characterImage}
        height={200}
        src={character.image}
        width={200}
      />
      <div className={styles.characterInfo}>
        <Title fontSize='1.25rem' headingLevel='h3' truncate>
          {capitalize(character.name)}
        </Title>

        <div className={styles.characterInfo_description}>
          <p className={styles.characterInfo_description__status}>
            <StatusPoint color={statusPointColors[character.status]} size='12px' />
            {capitalize(character.status)}
          </p>
          <span>-</span>
          <p>{capitalize(character.species)}</p>
        </div>
      </div>
    </Card>
  )
}
