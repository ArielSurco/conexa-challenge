import { type PropsWithChildren } from 'react'

import styles from './MainLayout.module.css'

export function MainLayout({ children }: PropsWithChildren) {
  return <main className={styles.mainLayout}>{children}</main>
}
