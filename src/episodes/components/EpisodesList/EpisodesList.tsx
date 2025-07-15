import { type Episode } from '@/episodes/types/Episode'

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
        <div key={episode.id}>
          <h3>{episode.name}</h3>
          <p>{episode.air_date}</p>
        </div>
      ))}
    </section>
  )
}
