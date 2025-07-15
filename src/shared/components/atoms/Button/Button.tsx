'use client'

import { type ComponentProps } from 'react'

import { cn } from '@/shared/utils/cn'

import styles from './Button.module.css'

interface ButtonProps extends ComponentProps<'button'> {
  variant: 'unstyled' | 'ghost'
}

export function Button({ variant, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[`variant_${variant}`], className)} {...props}>
      {children}
    </button>
  )
}
