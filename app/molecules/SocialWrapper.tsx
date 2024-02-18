import Instagram from '../assets/icons/Instagram-mobile.svg'
import Pinterest from '../assets/icons/Pinterest-mobile.svg'
import Tiktok from '../assets/icons/Tiktok-mobile.svg'
import Youtube from '../assets/icons/Youtube-mobile.svg'
import styles from './SocialWrapper.module.css'

const SocialWrapper = () => {
  return (
    <div className={ styles.social }>
      <img src={ Pinterest } alt="Logo Pinterest" />
      <img src={ Youtube } alt="Logo Youtube" />
      <img src={ Instagram } alt="Logo Instagram" />
      <img src={ Tiktok } alt="Logo Tiktok" />
    </div>
  )
}

export default SocialWrapper