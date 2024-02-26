export const extractMetafields = (metafields) => {
  return metafields.reduce((acc, metafield) => {
    acc[metafield.key] = metafield.value
    return acc
  }, {})
}

export const compileCategoriesFromArticles = (articles) => {
  const allCategories = articles.flatMap(article => {
    const metafieldsObject = extractMetafields(article.node.metafields.edges.map(edge => edge.node))
    return [metafieldsObject.first_category, metafieldsObject.second_category].filter(Boolean)
  })

  const uniqueCategories = [...new Set(allCategories)]

  return uniqueCategories
}


export const extractCategoriesFromArticle = (article) => {
  const metafieldsObject = extractMetafields(article.metafields)

  const categories = [metafieldsObject.first_category, metafieldsObject.second_category].filter(Boolean)

  return categories
}

