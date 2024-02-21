export const extractMetafields = (metafields) => {
  return metafields.reduce((acc, metafield) => {
    acc[metafield.key] = metafield.value
    return acc
  }, {})
}