export const RECENT_THREE_ARTICLES_QUERY = `#graphql
  query BlogLastThreeArticles(
    $blogHandle: String!,
    $first: Int = 3
  ) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasNextPage
          endCursor
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
