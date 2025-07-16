import { CharacterPreviewCardSkeleton } from '../CharacterPreviewCard/CharacterPreviewCardSkeleton'

import styles from './CharactersSection.module.css'

// ? Same than the default number of characters per page, to avoid flickering
const NUMBER_OF_SKELETON_CARDS = 20

const skeletonsArray = Array.from({ length: NUMBER_OF_SKELETON_CARDS }, (_, index) => index)

export const CharactersSectionListSkeletonTemplate = () => {
  return (
    <div className={styles.charactersList}>
      {skeletonsArray.map((index) => (
        <CharacterPreviewCardSkeleton isLoading key={index} />
      ))}
    </div>
  )
}
