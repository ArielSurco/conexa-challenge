import Image from 'next/image'

import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loadingContainer} data-global-loading>
      <Image alt='Loading' height={400} src='/global-loading.gif' width={400} />
    </div>
  )
}
