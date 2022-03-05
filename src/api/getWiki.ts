import getWikipedia, { getWikidataIdFromWikipedia, getWikimedia, getWikipediaTitleFromWikidataId } from './getWikipedia'
import getWikidata from './getWikidata'

const getWiki = async (inputId, callback, wikidataLog, errorLog) => {
  try {
    const id = !isWikidataId(inputId) ? inputId : await getWikipediaTitleFromWikidataId(inputId.toUpperCase())

    return await getWikimedia(id)
      .then((imageUrl) => {
        if (!showError(imageUrl)) callback({ imageUrl }, inputId)
      })

      .then(() => getWikipedia(id))
      .then((wikipedia) => {
        if (!showError(wikipedia && wikipedia?.pageid)) callback(wikipedia, inputId)
        else errorLog(getError('pageId', id))
      })

      .then(() => getWikidataIdFromWikipedia(id))
      .then((wikidata) => {
        if (!showError(wikidata && wikidata?.id)) callback({ wikidataId: wikidata && wikidata?.id }, inputId)
        else errorLog(getError('wikidataId', id))
        return wikidata && wikidata?.id
      })

      .then(async (newId) =>
        isWikidataId(id)
          ? getWikidata(id, wikidataLog)
          : newId && isWikidataId(newId)
          ? getWikidata(newId, wikidataLog)
          : ''
      )
      .then((claims) => {
        if (!showError(claims)) callback(claims, inputId)
        else errorLog(getError('noClaims', id))
      })
  } catch (e) {
    console.error(e)
    errorLog(getError('js', inputId, JSON.stringify(e)))
  }
}

const isWikidataId = (str) => /^q\d+$/i.test(str)

const showError = (obj) => {
  return !obj
}

const getError = (type, id, msg = '') => {
  switch (type) {
    case 'pageId':
      return {
        msg: 'Not found on Wikipedia in English',
        link: isWikidataId(id) ? `https://www.wikidata.org/wiki/${id}` : `https://www.google.com/search?q=${id}`,
        id,
      }

    case 'wikidataId':
      return !isWikidataId(id)
        ? {
            msg: 'Wikidata Id not found in Wikipedia',
            link: `https://www.google.com/search?q=${id}`,
            id,
          }
        : ''

    case 'noClaims':
      return isWikidataId(id)
        ? {
            msg: 'No claims found on Wikidata',
            link: `https://www.wikidata.org/wiki/${id}`,
            id,
          }
        : ''

    default:
      return {
        msg: 'API or JS Error. Watch the console',
        link: `https://www.wikidata.org/wiki/${id}`,
        id,
      }
  }
}

export default getWiki
