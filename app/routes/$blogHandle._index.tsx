import Card, { VARIANT } from '~/molecules/Card'
import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { BLOGS_QUERY } from '../graphql/blog/BlogsQuery'
import BlogIndexLayout from '~/layout/BlogIndexLayout'
import { RECENT_THREE_ARTICLES_QUERY } from '../graphql/blog/BlogRecentArticlesQuery'
import RecipesIndexLayout from '~/layout/RecipesIndexLayout'
import { getPaginationVariables } from '@shopify/hydrogen'
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

  return json({ blog, recentArticles, blogHandle: params.blogHandle })
}


export default function Blog() {

  const navigate = useNavigate()
  const { blog, recentArticles, blogHandle } = useLoaderData<typeof loader>()
  const lastArticle = recentArticles.blog.articles.nodes[0]
  const { articles } = blog

  let contentComponent

  switch (blogHandle) {
    case "blog":
      contentComponent = <BlogIndexLayout
        articles={ articles }
        blogHandle={ blogHandle }
        recentArticles={ recentArticles }
      />
      break
    case "recettes":
      contentComponent = <RecipesIndexLayout
        articles={ articles }
        blogHandle={ blogHandle }
        lastArticle={ lastArticle }
      />
      break
    default:
      contentComponent = <BlogIndexLayout articles={ articles }
        blogHandle={ blogHandle }
        recentArticles={ recentArticles } />
  }
  return (
    <>
      { contentComponent }
    </>
  )
}
