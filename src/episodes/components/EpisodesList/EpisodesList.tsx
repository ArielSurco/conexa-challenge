import { type Episode } from '@/episodes/types/Episode'

import { Card } from '@/shared/components/atoms/Card/Card'
import styles from './EpisodesList.module.css'

interface EpisodesListProps {
  episodes: Episode[]
  title: string
}

export const EpisodesList = ({ title, episodes }: EpisodesListProps) => {
  return (
    <section className={styles.episodesList}>
      <h2 className={styles.episodesListTitle}>{title}</h2>
      {episodes.map((episode) => (
        <Card key={episode.id}>
          <h3>{episode.name}</h3>
          <p>{episode.air_date}</p>
        </Card>
      ))}
    </section>
  )
}
