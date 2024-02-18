import BurgerIcon from '../assets/icons/Icon-menu.svg'
import CrossIcon from '../assets/icons/Icon-cross.svg'
import EggPlant from '../assets/stickers/EggPlant.svg'
import Navigation from './Navigation'
import SocialWrapper from './SocialWrapper'
import styles from './BurgerMenu.module.css'

const BurgerMenu = ({ toggleMenu, isOpen }: Props) => {

  return <>
    <div className={ styles['burger-menu'] } onClick={ toggleMenu }>
      <img src={ isOpen ? CrossIcon : BurgerIcon } alt="Menu" />
    </div>

    <nav className={ `${styles.navbar} ${isOpen ? styles.active : ''}` }>
      <div className={ styles.navWrapper }>
        <div className={ styles.links }>
          <Navigation handleClick={ toggleMenu } />
        </div>
        <img src={ EggPlant } alt="eggPlant illustration" />
        <div className={ styles.social }>
          <SocialWrapper />
        </div>
      </div>
    </nav>

  </>

}

interface Props {
  toggleMenu: () => void
  isOpen: boolean
}

export default BurgerMenu