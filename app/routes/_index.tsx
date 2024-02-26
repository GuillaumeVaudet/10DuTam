import Card, { VARIANT } from '~/molecules/Card'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { useLoaderData, useNavigate } from '@remix-run/react'
import ArrowTitle from '~/atoms/ArrowTitle'
import { BlogArticlesIDs } from '~/graphql/blog/BlogIdQuerry'
import { LAST_BLOG_ARTICLE } from '~/graphql/blog/BlogLastArticleQuery'
import { LeftPage } from '~/layout/LeftPage'
import { RightPage } from '~/layout/RightPage'
import { SELECT_ARTICLE_BY_ID } from '~/graphql/blog/BlogGetArticleByIdQuery'
import { extractMetafields } from '~/utils/ExtractMetafields'
import { selectRandomId } from '~/utils/SelectRandomId'
import styles from '../styles/index.module.css'
import theo from '../assets/images/Theo.png'

export async function loader({
  context: { storefront }
}: LoaderFunctionArgs) {

  const { blog } = await storefront.query(LAST_BLOG_ARTICLE, {
    variables: { blogHandle: "blog" }
  })

  if (!blog?.articles.edges[0].node) {
    throw new Response(null, { status: 404 })
  }

  const article = blog.articles.edges[0].node

  const recipe = await storefront.query(LAST_BLOG_ARTICLE, {
    variables: { blogHandle: "recettes" }
  })

  const lastRecipe = recipe.blog.articles.edges[0].node

  const recipesId = await storefront.query(BlogArticlesIDs, {
    variables: { blogHandle: "recettes", first: 100 }
  })

  const idsArray = recipesId.blog.articles.nodes
  const randomId = selectRandomId(idsArray)

  const fetchRandomBlogArticle = await storefront.query(SELECT_ARTICLE_BY_ID, {
    variables: { id: randomId }
  })

  const randomArticle = fetchRandomBlogArticle.article

  return json({ article, lastRecipe, randomArticle })
}

export default function Homepage() {
  const navigate = useNavigate()
  const { article, lastRecipe, randomArticle } = useLoaderData<typeof loader>()
  const articleMetafields = extractMetafields(article.metafields)

  return (
    <div className={ styles.home }>
      <RightPage>
        <ArrowTitle label={ 'Nouvelle Recette' } iconPosition={ 'right' } />
        <Card
          handleClick={ () => navigate(`/recettes/${lastRecipe.handle}`) }
          variant={ VARIANT.HomeRecipes }
          title={ lastRecipe.title }
          image={ lastRecipe.image.url }
        />
        <Card
          handleClick={ () => navigate(`/about`) }
          variant={ VARIANT.About }
          button={ 'À propos' }
          image={ theo }
        />
        <ArrowTitle label={ 'Article de blog' } iconPosition={ 'left' } />
        <Card
          handleClick={ () => navigate(`/blog/${article.handle}`) }
          variant={ VARIANT.Blog }
          title={ article.title }
          image={ article.image.url }
          timer={ articleMetafields.reading }
          button={ 'je veux savoir' }
        />
        <ArrowTitle label={ 'Une recette qui flingue' } iconPosition={ 'right' } />
        <Card
          handleClick={ () => navigate(`/recettes/${randomArticle.handle}`) }
          variant={ VARIANT.HomeRecipes }
          title={ randomArticle.title }
          image={ randomArticle.image.url }
        />
      </RightPage>
      <LeftPage>Left Page</LeftPage>
    </div>
  )
}
