import { Link } from '@remix-run/react'
import type { MouseEventHandler } from 'react'
import styles from './Navigation.module.css'

const Navigation = ({ handleClick }: NavigationProps) => {
  return (
    <div className={ styles['nav-wrapper'] }>
      <Link to={ '/' } onClick={ handleClick }>Accueil</Link>
      <Link to={ '/recettes' } onClick={ handleClick }>Recettes</Link>
      <Link to={ '/blog' } onClick={ handleClick }>Blog</Link>
      <Link to={ '/about' } onClick={ handleClick }>About</Link>
    </div>
  )
}

interface NavigationProps {
  handleClick: MouseEventHandler
}

export default Navigation