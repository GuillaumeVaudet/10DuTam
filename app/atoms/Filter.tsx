import { type MouseEventHandler } from 'react'
import arrow from '../assets/icons/angle-petit-bas.svg'
import styles from './Filter.module.css'

export function Filter({ handleClick, isOpen }: FilterProps) {
  // à chaque click sur un filtre j'ajoute le string du filtre à la requpête?  et don
  // au onClick -> je renvoie une demande pas ouf mais obligé avec le graphql? 
  return (<>
    <div className={ styles.filter } onClick={ handleClick }>
      <span>Filtres </span>
      <img src={ arrow } alt="" />
    </div>

    <div className={ `${styles['filter-wrapper']} ${isOpen ? styles.active : ''}` }>
      <ul>Liste des filtres</ul>
    </div>
  </>)
}

interface FilterProps {
  handleClick: MouseEventHandler<HTMLDivElement>
  isOpen: boolean
}