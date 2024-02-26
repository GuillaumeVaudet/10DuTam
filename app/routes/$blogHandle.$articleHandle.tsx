import { type LoaderFunctionArgs, json } from '@remix-run/server-runtime'
import { Image } from '@shopify/hydrogen'
import styles from '../layout/BlogIndexLayout.module.css'
import { useLoaderData } from '@remix-run/react'
import timer from '../assets/icons/horloge-dix.svg'

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
  console.log(article)
  return (
    <>
      <div className={ styles['top-article-wrapper'] }>
        <div className={ styles['image-wrapper'] }>
          { image && <Image data={ image } sizes="90vw" loading="eager" className={ styles['article-image'] } /> }
        </div>
        <div className={ styles.informations }>
          <div className={ `${styles.timer} ${styles['information-wrapper']}` }>
            <img src={ timer } alt="" />
            <span></span>
          </div>
          <div className={ `${styles.people} ${styles['information-wrapper']}` }></div>
          <div className={ `${styles.facile} ${styles['information-wrapper']}` }></div>
        </div>
        <div className={ styles['article-informations'] }>
          <p>Titre à changer</p>
        </div>
      </div>
      <div className={ styles.article }>
        <h1>
          { title }
        </h1>
        <div>
          { contentHtml }
        </div>
      </div>
    </>
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