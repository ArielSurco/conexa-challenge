import { cn } from '@/shared/utils/cn'
import { ComponentProps } from 'react'

import styles from './Card.module.css'

interface CardProps extends ComponentProps<'article'> {}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <article className={cn(styles.card, className)} {...props}>
      {children}
    </article>
  )
}
