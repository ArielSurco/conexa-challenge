import { Skeleton, type SkeletonProps } from '@/shared/components/atoms/Skeleton/Skeleton'

export const EpisodeCardSkeleton = ({ isLoading }: Pick<SkeletonProps, 'isLoading'>) => {
  return (
    <Skeleton
      data-testid='episode-card-skeleton'
      height='80px'
      isLoading={isLoading}
      width='100%'
    />
  )
}
