import { PropsWithChildren } from 'react'
import styles from './MainLayout.module.css'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <main className={styles.mainLayout}>{children}</main>
}
