import { cn } from '@/shared/utils/cn'
import { ComponentProps, CSSProperties } from 'react'
import styles from './Title.module.css'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface TitleProps extends ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  headingLevel: HeadingLevel
  fontSize?: CSSProperties['fontSize']
  truncate?: boolean
  alignment?: CSSProperties['textAlign']
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
