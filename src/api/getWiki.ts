import getWikipedia, { getWikidataIdFromWikipedia, getWikimedia, getWikipediaTitleFromWikidataId } from './getWikipedia'
import getWikidata from './getWikidata'

const getWiki = async (inputId, callback, wikidataLog) => {
  const id = !isWikipediaId(inputId) ? inputId : await getWikipediaTitleFromWikidataId(inputId)

  return await getWikimedia(id)
    .then((imageUrl) => {
      callback({ imageUrl }, inputId)
    })

    .then(() => getWikipedia(id))
    .then((wikipedia) => {
      callback(showError(wikipedia, wikipedia), inputId)
    })

    .then(() => getWikidataIdFromWikipedia(id))
    .then((wikidata) => {
      callback(showError(wikidata, { wikidataId: wikidata?.id }), inputId)
      return wikidata?.id
    })

    .then(async (id) => (id ? getWikidata(id, wikidataLog) : { error: 'No Wikidata id' }))
    .then((claims) => {
      callback(showError(claims, claims), inputId)
    })
}

const isWikipediaId = (str) => /^q\d+$/i.test(str)

const showError = (obj, desired) => {
  return obj?.['error'] || desired ? desired : { error: 'No data' }
}

export default getWiki
