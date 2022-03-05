import { reduce, map } from 'awaity'

import wikidataProperties from '../config/wikidataProps'
import wikidataItems from '../config/wikidataItems'

const getWikidata = async (id, wikidataLog) => {
  return fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=claims&origin=*`)
    .then((response) => response.json())
    .then(async (data) => {
      const claims = data?.entities?.[id]?.claims

      if (claims) {
        return await { claims: await parseWikidataClaims(claims, wikidataLog) }
      } else {
        return ''
      }
    })
}

const parseWikidataClaims = async (claims, wikidataLog) => {
  const filteredClaims: any = Object.keys(wikidataProperties).filter((k): any => claims?.[k])

  return await reduce(
    filteredClaims,
    async (acc, k) => {
      const ret = { ...acc }
      const conf = wikidataProperties[k]
      const { label: key, multi, type } = conf
      const newClaim = await parseWikidataClaim(claims[k], multi, type, wikidataLog)

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

const parseWikidataClaim = async (claim, multi, type, wikidataLog) =>
  await (multi
    ? map(claim, async (item) => parseWikidataClaimItem(item, type, wikidataLog))
    : parseWikidataClaimItem(claim[0], type, wikidataLog))

const parseWikidataClaimItem = async (item, type, wikidataLog) => {
  switch (type) {
    case 'date':
      return getYear(item?.mainsnak?.datavalue?.value?.time)

    case 'event': {
      const start =
        getYear(item?.qualifiers?.P580?.[0]?.datavalue?.value?.time) ||
        getYear(item?.qualifiers?.P585?.[0]?.datavalue?.value?.time)
      const end = getYear(item?.qualifiers?.P582?.[0]?.datavalue?.value?.time)
      const event: any = { name: await getWikidataLabel(item?.mainsnak?.datavalue?.value?.id, wikidataLog) }
      if (start) event.start = start
      if (end) event.end = end
      return !end || start ? event : null
    }

    default:
      return await getWikidataLabel(item?.mainsnak?.datavalue?.value?.id, wikidataLog)
  }
}

const getYear = (date) => {
  const strDate = date && date.toString()
  return date ? Number(strDate.slice(0, strDate.indexOf('-', 1))) : null
}

const getWikidataLabel = async (wikidataId, wikidataLog) => {
  return await (wikidataId && wikidataItems?.[wikidataId]
    ? wikidataItems?.[wikidataId]
    : fetchWikidataLabel(wikidataId, wikidataLog))
}

const fetchWikidataLabel = async (wikidataId, wikidataLog) =>
  fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&format=json&props=labels&languages=en&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const label = data?.entities?.[wikidataId]?.labels?.en?.value
      if (label) {
        wikidataLog({ [wikidataId]: label })
        wikidataItems[wikidataId] = label
        return label
      } else {
        return wikidataId
      }
    })

export default getWikidata
