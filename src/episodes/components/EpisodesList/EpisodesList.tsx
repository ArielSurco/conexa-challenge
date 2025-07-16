import { type ComponentProps } from 'react'

import { type Episode } from '@/episodes/types/Episode'
import { Skeleton, type SkeletonProps } from '@/shared/components/atoms/Skeleton/Skeleton'
import { Title } from '@/shared/components/atoms/Title/Title'

import { EpisodeCard } from '../EpisodeCard/EpisodeCard'

import styles from './EpisodesList.module.css'
import { EpisodesListSkeletonTemplate } from './EpisodesListSkeletonTemplate'

interface EpisodesListProps
  extends Pick<ComponentProps<'section'>, 'id'>,
    Pick<SkeletonProps, 'isLoading'> {
  episodes: Episode[]
  title: string
}

export const EpisodesList = ({ title, episodes, id, isLoading = false }: EpisodesListProps) => {
  return (
    <section className={styles.episodesList} id={id}>
      <Title fontSize='1.5rem' headingLevel='h2'>
        {title}
      </Title>
      <Skeleton isLoading={isLoading} template={<EpisodesListSkeletonTemplate />}>
        {episodes.length > 0 ? (
          episodes.map((episode) => <EpisodeCard episode={episode} key={episode.id} />)
        ) : (
          <p>No episodes found</p>
        )}
      </Skeleton>
    </section>
  )
}
