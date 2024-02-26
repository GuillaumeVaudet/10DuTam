import Card, { VARIANT } from "~/molecules/Card"
import { Link, useNavigate } from "@remix-run/react"
import { Filter } from "~/atoms/Filter"
import { LeftPage } from "./LeftPage"
import { Pagination } from "@shopify/hydrogen"
import { RightPage } from "./RightPage"
import { extractCategoriesFromArticle } from "~/utils/ExtractMetafields"
import silverware from '../assets/icons/couverts.svg'
import styles from './RecipesIndexLayout.module.css'
import timer from '../assets/icons/horloge-dix.svg'
import { useState } from "react"

const RecipesIndexLayout = ({ articles, blogHandle, lastArticle }) => {
  const navigate = useNavigate()
  const metafieldsFromLastArticle = extractCategoriesFromArticle(lastArticle)

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return (<>
    { ' ' }
    <RightPage>
      <Link to={ `/${lastArticle.blog.handle}/${lastArticle.handle}` }>
        <div className={ `${styles["top-part"]} ${blogHandle === "blog" ? styles.blogStyle : styles.recettes}` }>
          <img src={ lastArticle.image.url } alt="" />
          <div className={ styles["title-part"] }>
            <h3 className={ styles.title }>{ lastArticle.title }</h3>
            <div className={ styles['recipe-informations'] }>
              <span className={ styles.categories }>
                { metafieldsFromLastArticle[0] }
                ⏺
                { metafieldsFromLastArticle[1] }
              </span>
              <div className={ styles['picto-div'] }>
                <img src={ timer } alt="" />
                <span>{ lastArticle.metafields[4].value } min</span>
                <img src={ silverware } alt="" />
                <span>{ lastArticle.metafields[3].value }</span>
                <span>{ lastArticle.metafields[2].value }</span>
              </div>
            </div>
          </div>
        </div>
      </Link >

      <div className={ styles.listing }>
        <h2>Toutes les recettes</h2>
        <Filter handleClick={ toggleMenu } isOpen={ isOpen } />
        <Pagination connection={ articles }>
          { ({ nodes, isLoading, PreviousLink, NextLink }) => {
            return (
              <>
                <PreviousLink>
                  { isLoading ? 'Loading...' : <span>↑ Load previous</span> }
                </PreviousLink>
                { nodes.map((article) => (
                  <Card
                    key={ article.id }
                    title={ article.title }
                    image={ article.image.url }
                    variant={ VARIANT.Blog }
                    handleClick={ () => navigate(`/${article.blog.handle}/${article.handle}`) }
                  />
                )) }
                <NextLink>
                  { isLoading ? 'Loading...' : <span>Load more ↓</span> }
                </NextLink>
              </>
            )
          } }
        </Pagination>
      </div>
    </RightPage >
    <LeftPage></LeftPage>
  </>)
}


export default RecipesIndexLayout