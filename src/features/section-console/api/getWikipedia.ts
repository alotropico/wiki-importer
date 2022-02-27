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
        return { title, pageid, extract } || { error: 'No page id' }
      } else {
        return { error: 'Something went wrong' }
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
        return 'Something went wrong'
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

        return info?.pageprops?.wikibase_item || 'No Wikidata id'
      } else {
        return 'Something went wrong'
      }
    })
}

export { getWikidataIdFromWikipedia, getWikimedia }
export default getWikipedia
