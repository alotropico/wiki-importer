import { reduce, map } from 'awaity'

import wikidataProperties from '../config/wikidataProps'
import wikidataItems from '../config/wikidataItems'

const getWikidata = async (id) => {
  return fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=claims&origin=*`)
    .then((response) => response.json())
    .then(async (data) => {
      const claims = data?.entities?.[id]?.claims

      if (claims) {
        return await { claims: await parseWikidataClaims(claims) }
      } else {
        return { error: 'No claims found on Wikidata' }
      }
    })
}

const parseWikidataClaims = async (claims) => {
  const filteredClaims: any = Object.keys(wikidataProperties).filter((k): any => claims?.[k])

  return await reduce(
    filteredClaims,
    async (acc, k) => {
      const ret = { ...acc }
      const conf = wikidataProperties[k]
      const { label: key, multi, type } = conf
      const newClaim = await parseWikidataClaim(claims[k], multi, type)

      if (multi) {
        if (!ret?.[key]) ret[key] = []
        if (newClaim) ret[key] = [...new Set([...ret[key], ...newClaim].filter((i) => i))]
      } else {
        if (newClaim) ret[key] = newClaim
      }

      return ret
    },
    {}
  )
}

const parseWikidataClaim = async (claim, multi, type) =>
  await (multi
    ? map(claim, async (item) => parseWikidataClaimItem(item, type))
    : parseWikidataClaimItem(claim[0], type))

const parseWikidataClaimItem = async (item, type) => {
  switch (type) {
    case 'date':
      return getYear(item?.mainsnak?.datavalue?.value?.time)

    case 'event': {
      const start =
        getYear(item?.qualifiers?.P580?.[0]?.datavalue?.value?.time) ||
        getYear(item?.qualifiers?.P585?.[0]?.datavalue?.value?.time)
      const end = getYear(item?.qualifiers?.P582?.[0]?.datavalue?.value?.time)
      const event: any = { name: await getWikidataLabel(item?.mainsnak?.datavalue?.value?.id) }
      if (start) event.start = start
      if (end) event.end = end
      return !end || start ? event : null
    }

    default:
      return await getWikidataLabel(item?.mainsnak?.datavalue?.value?.id)
  }
}

const getYear = (date) => {
  const strDate = date && date.toString()
  return date ? Number(strDate.slice(0, strDate.indexOf('-', 1))) : null
}

const getWikidataLabel = async (wikidataId) => {
  return await (wikidataId && wikidataItems?.[wikidataId]
    ? wikidataItems?.[wikidataId]
    : fetchWikidataLabel(wikidataId))
}

const fetchWikidataLabel = async (wikidataId) =>
  fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&format=json&props=labels&languages=en&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const label = data?.entities?.[wikidataId]?.labels?.en?.value
      if (label) {
        wikidataItems[wikidataId] = label
        return label
      } else {
        return wikidataId
      }
    })

export default getWikidata
