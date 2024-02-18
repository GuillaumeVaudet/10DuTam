import type { ReactNode } from 'react'
import styles from './LeftPage.module.css'

export function LeftPage({ children }: LeftPageProps) {
  return (
    <>
      <div className={ styles['left-page-wrapper'] }>{ children }</div>
    </>
  )
}

export type LeftPageProps = {
  children?: ReactNode
}
