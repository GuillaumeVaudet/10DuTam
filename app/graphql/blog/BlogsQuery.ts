// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
export const BLOGS_QUERY = `#graphql
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
        metafields(identifiers: [
          {namespace: "custom", key: "blog_article"},
          {namespace: "custom", key: "reading"} ]) {
          key
          value
          type
        }
  }
        ` as const