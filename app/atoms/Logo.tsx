import { Link } from '@remix-run/react'
import logo from '../assets/Logo.svg'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <Link to={ '/' }
      className={ styles['image-wrapper'] }>
      <img src={ logo } alt="logo de 10 du tam" />
    </Link >
  )
}