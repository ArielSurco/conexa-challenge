import { Card } from '@/shared/components/atoms/Card/Card'
import { Skeleton, type SkeletonProps } from '@/shared/components/atoms/Skeleton/Skeleton'

import styles from './CharacterPreviewCard.module.css'

export const CharacterPreviewCardSkeleton = ({ isLoading }: Pick<SkeletonProps, 'isLoading'>) => {
  return (
    <Skeleton height='120px' isLoading={isLoading}>
      <Card className={styles.characterCard}>
        <Skeleton className={styles.characterImage} isLoading />
        <div className={styles.characterInfo}>
          <Skeleton height='20px' isLoading width='100%' />
          <Skeleton height='20px' isLoading width='100%' />
        </div>
      </Card>
    </Skeleton>
  )
}
