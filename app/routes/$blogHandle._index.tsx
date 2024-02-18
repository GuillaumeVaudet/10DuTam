import Card, { VARIANT } from '~/molecules/Card'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { useLoaderData, useNavigate } from '@remix-run/react'
import ArrowTitle from '~/atoms/ArrowTitle'
import { LeftPage } from '~/layout/LeftPage'
import { RightPage } from '~/layout/RightPage'
import { getPaginationVariables } from '@shopify/hydrogen'
import styles from '../styles/blogHandle.module.css'

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

  const { blog } = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  })

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 })
  }

  return json({ blog })
}


export default function Blog() {
  const navigate = useNavigate()
  const { blog } = useLoaderData<typeof loader>()
  const { articles } = blog

  console.log("blogs récupérés ", blog)
  console.log("articles récupérés ", articles)
  const sortedArticles = articles.nodes.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 3);

  return (<>
    <RightPage>
      <div className={ styles["top-part"] }>
        <ArrowTitle
          iconPosition={ "right" }
          label={ "Nouveaux articles" }
        />
        { sortedArticles.map((article) => (
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
        { articles.nodes.map((article) => (
          <Card
            key={ article.id }
            title={ article.title }
            image={ article.image.url }
            variant={ VARIANT.Blog }
            handleClick={ () => navigate(`/${article.blog.handle}/${article.handle}`) }
          />
        )) }
      </div>
    </RightPage>
    <LeftPage></LeftPage>
  </>
  )
}


// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
        $language: LanguageCode
        $blogHandle: String!
        $first: Int
        $last: Int
        $startCursor: String
        $endCursor: String
        ) @inContext(language: $language) {
          blog(handle: $blogHandle) {
          title
      seo {
          title
        description
      }
        articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
        ) {
          nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
        hasNextPage
        endCursor
        startCursor
        }

      }
    }
  }
        fragment ArticleItem on Article {
          author: authorV2 {
          name
        }
        contentHtml
        handle
        id
        image {
          id
      altText
        url
        width
        height
    }
        publishedAt
        title
        blog {
          handle
        }
  }
        ` as const