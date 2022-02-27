import getWikipedia, { getWikidataIdFromWikipedia, getWikimedia } from './getWikipedia'
import getFromWikidata from './getFromWikidata'

const getWiki = async (id, callback) => {
  return await getWikimedia(id)
    .then((imageUrl) => {
      callback({ imageUrl }, id)
    })

    .then(() => getWikipedia(id))
    .then((wikipedia) => {
      callback({ ...wikipedia }, id)
    })

    .then(() => getWikidataIdFromWikipedia(id))
    .then((wikidataId) => {
      callback({ wikidataId }, id)
      return wikidataId
    })

    .then((id) => getFromWikidata(id))
    .then((claims) => {
      callback({ claims }, id)
    })
}

export default getWiki
