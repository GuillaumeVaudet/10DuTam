export const GET_RECIPES_CATEGORIES = `#graphql 
  query Blog($blogHandle: String!, $first: Int!, $after: String) {
  blog(handle: $blogHandle) {
    articles(first: $first, after: $after) {
      edges {
        cursor
        node {
          title
          metafields(
            identifiers: [
            {namespace: "custom", key: "first_categorie"},
            {namespace: "custom", key: "second_categorie"}
            ]
          ){
            key
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`
