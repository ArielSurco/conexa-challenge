import { type ComponentProps } from 'react'

import { type Episode } from '@/episodes/types/Episode'
import { Title } from '@/shared/components/atoms/Title/Title'

import { EpisodeCard } from '../EpisodeCard/EpisodeCard'

import styles from './EpisodesList.module.css'

interface EpisodesListProps extends Pick<ComponentProps<'section'>, 'id'> {
  episodes: Episode[]
  title: string
}

export const EpisodesList = ({ title, episodes, id }: EpisodesListProps) => {
  return (
    <section className={styles.episodesList} id={id}>
      <Title fontSize='1.5rem' headingLevel='h2'>
        {title}
      </Title>
      {episodes.map((episode) => (
        <EpisodeCard episode={episode} key={episode.id} />
      ))}
    </section>
  )
}
