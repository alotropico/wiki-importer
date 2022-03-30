import getWikipedia, { getWikidataIdFromWikipedia, getWikimedia, getWikipediaTitleFromWikidataId } from './getWikipedia'
import getWikidata, { getWikidataLabel } from './getWikidata'
import isWikidataId from '../utils/isWikidataId'
import extUrl from '../utils/extUrl'

const getWiki = async (inputId, callback, wikidataLog, errorLog) => {
  try {
    const id = !isWikidataId(inputId) ? inputId : await getWikipediaTitleFromWikidataId(inputId.toUpperCase())

    if (isWikidataId(id)) {
      const title = await getWikidataLabel(id, () => null)
      if (!isWikidataId(title)) callback({ title }, inputId)
    } else {
      await getWikimedia(id).then((imageUrl) => {
        if (!showError(imageUrl)) callback({ imageUrl }, inputId)
        return imageUrl ? imageUrl : ''
      })
    }

    const wikipediaData = await getWikipedia(id).then((wikipedia) => {
      if (!showError(wikipedia && wikipedia?.pageid)) callback(wikipedia, inputId)
      else errorLog(getError('pageId', id))
    })

    const wikidataId = isWikidataId(id)
      ? id
      : isWikidataId(inputId)
      ? inputId
      : await getWikidataIdFromWikipedia(id).then((wikidata) => {
          if (!showError(wikidata && wikidata?.id)) callback({ wikidataId: wikidata && wikidata?.id }, inputId)
          else errorLog(getError('wikidataId', id))
          return wikidata && wikidata?.id
        })

    if (isWikidataId(wikidataId)) {
      await getWikidata(wikidataId, wikidataLog).then((claims) => {
        if (!showError(claims)) callback(claims, inputId)
        else errorLog(getError('noClaims', id))
      })
    }
  } catch (e) {
    console.error(e)
    errorLog(getError('js', inputId))
  }
}

const showError = (obj) => {
  return !obj
}

const getError = (type, id) => {
  switch (type) {
    case 'pageId':
      return {
        msg: 'Not found on Wikipedia in English',
        link: extUrl(id),
        id,
      }

    case 'wikidataId':
      return !isWikidataId(id)
        ? {
            msg: 'Wikidata Id not found in Wikipedia',
            link: extUrl(id),
            id,
          }
        : ''

    case 'noClaims':
      return isWikidataId(id)
        ? {
            msg: 'No claims found on Wikidata',
            link: extUrl(id),
            id,
          }
        : ''

    default:
      return {
        msg: 'API or JS Error. Watch the console',
        link: extUrl(id),
        id,
      }
  }
}

export default getWiki
