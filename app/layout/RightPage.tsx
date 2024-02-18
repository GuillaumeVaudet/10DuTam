import type { ReactNode } from 'react'
import styles from './RightPage.module.css'

export function RightPage({ children }: RightPageProps) {
  return (
    <>
      <div className={ styles['right-page-wrapper'] }>{ children }</div>
    </>
  )
}

export type RightPageProps = {
  children?: ReactNode;
}
