import { type ComponentProps } from 'react'

import { cn } from '@/shared/utils/cn'

import styles from './Card.module.css'

export const Card = ({ className, children, ...props }: ComponentProps<'article'>) => {
  return (
    <article className={cn(styles.card, className)} {...props}>
      {children}
    </article>
  )
}
