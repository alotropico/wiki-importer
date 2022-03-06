import isWikidataId from './isWikidataId'

const extUrl = (id) =>
  isWikidataId(id) ? `https://www.wikidata.org/wiki/${id}` : `https://www.google.com/search?q=${id}`
export default extUrl
