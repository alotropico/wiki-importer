const getWikipedia = async (id) => {
  return fetch(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${id}&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const pages = data?.query?.pages
      if (pages) {
        const info = pages[Object.keys(pages)[0]]
        const { title, pageid, extract } = info
        return (
          {
            title,
            pageid,
            extract: parseWikidataExtract(extract || ''),
          } || { error: 'No page id on Wikipedia object' }
        )
      } else {
        return { error: 'No pages found on Wikipedia' }
      }
    })
}

const getWikimedia = async (id) => {
  return fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${id}&prop=pageimages&format=json&pithumbsize=100&redirects=1&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const pages = data?.query?.pages
      if (pages) {
        const info = pages[Object.keys(pages)[0]]
        return info?.thumbnail?.source || null
      } else {
        return { error: 'No pages found on Wikimedia' }
      }
    })
}

const getWikidataIdFromWikipedia = async (id) => {
  return fetch(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageprops&redirects=1&titles=${id}&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const pages = data?.query?.pages
      if (pages) {
        const info = pages[Object.keys(pages)[0]]
        return { id: info?.pageprops?.wikibase_item } || { error: 'No Wikidata id' }
      } else {
        return { error: 'Wikidata id not found on Wikipedia' }
      }
    })
}

const getWikipediaTitleFromWikidataId = async (id) => {
  return fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${id}&sitefilter=enwiki&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const title = data?.entities?.[id]?.sitelinks?.enwiki?.title
      if (title) {
        return title
      } else {
        return id
      }
    })
}

const parseWikidataExtract = (str) =>
  str
    .replaceAll('  ', ' ')
    .replace(/\s*\(.*\)/, '')
    .replace(/\s*\[.*\]/, '')

export { getWikidataIdFromWikipedia, getWikimedia, getWikipediaTitleFromWikidataId }
export default getWikipedia
