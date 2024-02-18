import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { Image } from '@shopify/hydrogen'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { blogHandle, articleHandle } = params

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 })
  }

  const { blog } = await context.storefront.query(ARTICLE_QUERY, {
    variables: { blogHandle, articleHandle },
  })

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 })
  }

  const article = blog.articleByHandle

  return json({ article })
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>()
  const { title, image, contentHtml, author } = article

  return (
    <div className="article">
      <h1>
        { title }
      </h1>

      { image && <Image data={ image } sizes="90vw" loading="eager" /> }
      <div
        dangerouslySetInnerHTML={ { __html: contentHtml } }
        className="article"
      />
    </div>
  )
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const