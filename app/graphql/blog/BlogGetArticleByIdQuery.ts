export const SELECT_ARTICLE_BY_ID = `#graphql
  query ArticleDetails($id: ID!) {
    article(id: $id) {
      id
      handle
      title
      contentHtml
      publishedAt
      image {
        url
        altText
      }
    }
}
` as const