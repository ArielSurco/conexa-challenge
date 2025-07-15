import { type ComponentProps, type CSSProperties } from 'react'

import { cn } from '@/shared/utils/cn'

import styles from './Title.module.css'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface TitleProps extends ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  alignment?: CSSProperties['textAlign']
  fontSize?: CSSProperties['fontSize']
  headingLevel: HeadingLevel
  truncate?: boolean
}

export const Title = ({
  children,
  className,
  headingLevel,
  truncate,
  fontSize,
  alignment,
  ...props
}: TitleProps) => {
  const Heading = headingLevel

  return (
    <Heading
      className={cn(styles.title, truncate && styles.truncate, className)}
      style={{ '--title-font-size': fontSize, '--title-alignment': alignment } as CSSProperties}
      {...props}
    >
      {children}
    </Heading>
  )
}
