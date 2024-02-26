import Card, { VARIANT } from '~/molecules/Card'
import ArrowTitle from '~/atoms/ArrowTitle'
import { LeftPage } from './LeftPage'
import { Pagination } from '@shopify/hydrogen'
import { RightPage } from './RightPage'
import styles from './BlogIndexLayout.module.css'
import { useNavigate } from '@remix-run/react'

const BlogIndexLayout = ({ articles, blogHandle, recentArticles }) => {
  const navigate = useNavigate()

  return (<>
    { ' ' }
    <RightPage>
      <div className={ `${styles["top-part"]} ${blogHandle === "blog" ? styles.blogStyle : styles.recettes}` }>
        <ArrowTitle
          iconPosition={ "right" }
          label={ "Nouveaux articles" }
        />
        { recentArticles.blog.articles.nodes.map((article: Article) => (
          <Card
            key={ article.id }
            title={ article.title }
            image={ article.image.url }
            variant={ VARIANT.Blog }
            handleClick={ () => navigate(`/${article.blog.handle}/${article.handle}`) }
          />
        )) }
      </div>
      <div className={ styles.listing }>
        <h2>Les Articles de Blog</h2>
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
    </RightPage>
    <LeftPage></LeftPage>
  </>)
}

export default BlogIndexLayout
