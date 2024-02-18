import type { PropsWithChildren } from 'react'
import arrow from '../assets/icons/curve-arrow.svg'
import styles from './ArrowTitle.module.css'

const ArrowTitle = ({ label, iconPosition = 'right' }: PropsWithChildren<Props>) => {

  return <>
    <div
      className={ iconPosition === 'left' ? styles.iconLeft : styles.iconRight }>
      { label }
      <img src={ arrow } alt="Flèche manuscrite" />
    </div>
  </>
}

interface Props {
  label: string
  iconPosition: 'right' | 'left'
}

export default ArrowTitle
