import { Character } from '@/characters/types/Character'
import { StatusPoint } from '@/shared/components/atoms/StatusPoint/StatusPoint'
import { capitalize } from '@/shared/utils/capitalize'
import Image from 'next/image'
import styles from './CharacterPreviewCard.module.css'

interface CharacterPreviewCardProps {
  character: Character
}

export const statusPointColors: Record<Character['status'], string> = {
  Alive: '#00ff9d',
  Dead: '#ff005d',
  unknown: '#cccccc',
}

export const CharacterPreviewCard = ({ character }: CharacterPreviewCardProps) => {
  return (
    <article className={styles.characterCard}>
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className={styles.characterImage}
      />
      <div className={styles.characterInfo}>
        <h3 className={styles.characterInfo_name}>{capitalize(character.name)}</h3>
        <div className={styles.characterInfo_description}>
          <p className={styles.characterInfo_description__status}>
            <StatusPoint color={statusPointColors[character.status]} size='12px' />
            {capitalize(character.status)}
          </p>
          <span>-</span>
          <p>{capitalize(character.species)}</p>
        </div>
      </div>
    </article>
  )
}
