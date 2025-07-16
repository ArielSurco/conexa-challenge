import { type Episode } from '@/episodes/types/Episode'
import { Card } from '@/shared/components/atoms/Card/Card'
import { Title } from '@/shared/components/atoms/Title/Title'

import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episode: Episode
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Card className={styles.episodeCard} key={episode.id}>
      <Title fontSize='1.25rem' headingLevel='h3'>
        {episode.name}
      </Title>
      <p className={styles.episodeAirDate}>Air date: {episode.air_date}</p>
    </Card>
  )
}
