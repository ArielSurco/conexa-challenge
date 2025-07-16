import { EpisodeCardSkeleton } from '../EpisodeCard/EpisodeCardSkeleton'

const NUMBER_OF_SKELETON_CARDS = 2

const skeletonsArray = Array.from({ length: NUMBER_OF_SKELETON_CARDS }, (_, index) => index)

export const EpisodesListSkeletonTemplate = () => {
  return (
    <>
      {skeletonsArray.map((index) => (
        <EpisodeCardSkeleton isLoading key={index} />
      ))}
    </>
  )
}
