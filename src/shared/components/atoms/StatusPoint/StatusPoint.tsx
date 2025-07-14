import { CSSProperties } from 'react'
import styles from './StatusPoint.module.css'

interface StatusPointProps {
  size?: `${number}px`
  color?: string
}

export const StatusPoint = ({
  size = '8px',
  color = 'var(--color-status-point)',
}: StatusPointProps) => {
  return (
    <span
      className={styles.statusPoint}
      style={{ '--status-point-size': size, '--status-point-color': color } as CSSProperties}
    />
  )
}
