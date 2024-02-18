import Card, { VARIANT } from '~/molecules/Card'
import ArrowTitle from '~/atoms/ArrowTitle'
import { LeftPage } from '~/layout/LeftPage'
import { RightPage } from '~/layout/RightPage'
import burger from '../assets/images/burger.jpeg'
import gyozas from '../assets/images/gyozas.png'
import ramen from '../assets/images/soup.png'
import styles from '../styles/index.module.css'
import theo from '../assets/images/Theo.png'

export default function Homepage() {
  return (
    <div className={ styles.home }>
      <RightPage>
        <ArrowTitle label={ 'Nouvelle recette' } iconPosition={ 'right' } />
        <Card
          handleClick={ () => console.log('clic sur carte') }
          variant={ VARIANT.HomeRecipes }
          title={ 'Burger maison' }
          image={ burger }
        />
        <Card
          handleClick={ () => console.log('clic sur home about') }
          variant={ VARIANT.About }
          button={ 'À propos' }
          image={ theo }
        />
        <ArrowTitle label={ 'Article de blog' } iconPosition={ 'left' } />
        <Card
          handleClick={ () => console.log('clic sur article de blog') }
          variant={ VARIANT.Blog }
          title={ 'D\'où viennent les gyozas' }
          image={ gyozas }
          timer={ 4 }
          button={ 'je veux savoir' }
        />
        <Card
          handleClick={ () => console.log('clic sur carte') }
          variant={ VARIANT.HomeRecipes }
          title={ 'Ramen express' }
          image={ ramen }
        />
      </RightPage>
      <LeftPage>Left Page</LeftPage>
    </div>
  )
}
