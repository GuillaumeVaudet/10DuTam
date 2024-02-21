export const LAST_BLOG_ARTICLE = `#graphql
query Blog($blogHandle: String!) {
  blog(handle: $blogHandle) {
    articles(first: 1, sortKey: PUBLISHED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          publishedAt
          contentHtml
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
          metafields(
            identifiers: [{namespace: "custom", key: "blog_article"}, {namespace: "custom", key: "reading"}]
          ) {
            key
            value
            type
          }
        }
      }
    }
  }
}
`