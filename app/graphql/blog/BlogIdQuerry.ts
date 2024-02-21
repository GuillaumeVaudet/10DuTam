export const BlogArticlesIDs = `#graphql
  query Blog(
    $blogHandle: String!
    $first: Int) {
  blog(handle: $blogHandle) {
    articles(first: $first) {
      nodes {
        id
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
` as const
