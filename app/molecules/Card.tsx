import Button, { VARIANT as ButtonVariant } from '../atoms/Button'
import type { MouseEventHandler } from 'react'
import glasses from '../assets/icons/glasses.svg'
import styles from './Card.module.css'

export enum VARIANT {
  HomeRecipes = 'homeRecipes',
  Recipes = 'recipes',
  RecipesList = 'recipesList',
  Shop = 'shop',
  About = 'about',
  Blog = 'blog'
}


const Card = ({ handleClick, variant, timer, image, title, button }: Props) => {
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text || ''
  }
  const truncatedTitle = truncateText(title, 28)

  return <>
    <div className={ `${styles.wrapper} ${styles[variant]}` }
      onClick={ handleClick }
    >
      <img src={ image } alt="" />
      <div className={ styles['card-title'] }>
        { truncatedTitle }
        <div className={ styles.timer }>
          <img className={ styles.icon } src={ glasses } alt="" />
          <span>
            { ' ' }
            { timer }
            { ' ' }
            min.
          </span>
        </div>
      </div>
      { button &&
        <Button type={ "button" } label={ button } variant={ ButtonVariant.Primary } handleClick={ handleClick } />
      }
    </div>
  </>
}

interface Props {
  handleClick: MouseEventHandler<HTMLDivElement>
  variant: VARIANT
  timer?: number
  image: string
  title?: string
  button?: string
}
export default Card
