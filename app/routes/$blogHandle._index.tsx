import Card, { VARIANT } from '~/molecules/Card'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { Pagination, getPaginationVariables } from '@shopify/hydrogen'
import { useLoaderData, useNavigate } from '@remix-run/react'
import ArrowTitle from '~/atoms/ArrowTitle'
import { BLOGS_QUERY } from '../graphql/blog/BlogsQuery'
import { LeftPage } from '~/layout/LeftPage'
import { RECENT_THREE_ARTICLES_QUERY } from '../graphql/blog/BlogRecentArticlesQuery'
import { RightPage } from '~/layout/RightPage'
import styles from '../styles/blogHandle.module.css'

export interface Article {
  id: string,
  title: string,
  publishedAt: string,
  handle: string,
  author: {
    name: string
  },
  blog: {
    handle: string
  },
  contentHtml: string,
  image: {
    altText: string | null,
    height: number,
    width: number,
    id: string,
    url: string,
  }
}

export const loader = async ({
  request,
  params,
  context: { storefront },
}: LoaderFunctionArgs) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  })

  if (!params.blogHandle) {
    throw new Response(`blog not found`, { status: 404 })
  }

  const recentArticles = await storefront.query(RECENT_THREE_ARTICLES_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
    },
  })

  const { blog } = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  })

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 })
  }

  return json({ blog, recentArticles })
}


export default function Blog() {

  const navigate = useNavigate()
  const { blog, recentArticles } = useLoaderData<typeof loader>()
  const { articles } = blog

  return (<>
    <RightPage>
      <div className={ styles["top-part"] }>
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
  </>
  )
}
