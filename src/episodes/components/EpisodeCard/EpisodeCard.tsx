import { type Episode } from '@/episodes/types/Episode'
import { Card } from '@/shared/components/atoms/Card/Card'

import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episode: Episode
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Card className={styles.episodeCard} key={episode.id}>
      <h3>{episode.name}</h3>
      <p>{episode.air_date}</p>
    </Card>
  )
}
