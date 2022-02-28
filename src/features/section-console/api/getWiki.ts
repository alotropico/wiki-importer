import getWikipedia, { getWikidataIdFromWikipedia, getWikimedia } from './getWikipedia'
import getWikidata from './getWikidata'

const getWiki = async (id, callback) => {
  return await getWikimedia(id)
    .then((imageUrl) => {
      callback({ imageUrl }, id)
    })

    .then(() => getWikipedia(id))
    .then((wikipedia) => {
      callback(showError(wikipedia, wikipedia), id)
    })

    .then(() => getWikidataIdFromWikipedia(id))
    .then((wikidata) => {
      callback(showError(wikidata, { wikidataId: wikidata?.id }), id)
      return wikidata?.id
    })

    .then(async (id) => (id ? getWikidata(id) : { error: 'No Wikidata id' }))
    .then((claims) => {
      callback(showError(claims, claims), id)
    })
}

const showError = (obj, desired) => {
  return obj?.['error'] || desired ? desired : { error: 'No data' }
}

export default getWiki
