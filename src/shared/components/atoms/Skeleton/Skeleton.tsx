import { type CSSProperties, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

import styles from './Skeleton.module.css'

export interface SkeletonProps extends ComponentProps<'div'> {
  height?: CSSProperties['height']
  isLoading?: boolean
  template?: ReactNode
  width?: CSSProperties['width']
}

export const Skeleton = ({
  className,
  children,
  height,
  isLoading = true,
  width,
  template,
  ...props
}: SkeletonProps) => {
  if (!isLoading) return children

  if (template) {
    return template
  }

  return (
    <div
      className={cn(styles.skeleton, className)}
      style={{ '--skeleton-width': width, '--skeleton-height': height } as CSSProperties}
      {...props}
    />
  )
}
