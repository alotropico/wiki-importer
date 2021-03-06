import { reduce } from 'awaity'

import wikidataProperties from '../config/wikidataProps'
import wikidataItems from '../config/wikidataItems'
import isWikidataId from '../utils/isWikidataId'

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

const parseWikidataClaim = async (claim, multi, type, wikidataLog) => {
  if (!claim) return ''

  if (!multi) return parseWikidataClaimItem(claim[0], type, wikidataLog)

  const ret: any = []

  for (let i = 0; i < claim.length; i++) {
    const item = claim[i]
    const newItem = await parseWikidataClaimItem(item, type, wikidataLog)
    ret.push(newItem)
  }

  return ret
}

const parseWikidataClaimItem = async (item, type, wikidataLog) => {
  switch (type) {
    case 'date':
      return getDate(item?.mainsnak?.datavalue?.value)

    case 'event': {
      const nameRef = item?.mainsnak?.datavalue?.value?.id
      const name = !nameRef ? '' : await getWikidataLabel(item?.mainsnak?.datavalue?.value?.id, wikidataLog)
      const time = getDateDatum(item)
      const event: any = {
        ...(name && { name }),
        ...(Object.keys(time).length && time),
      }
      return Object.keys(event).length ? event : null
    }

    case 'coordinates':
      return getCoordinates(item?.mainsnak?.datavalue?.value)

    case 'place':
      return getWikidataLabel(item?.mainsnak?.datavalue?.value?.id, wikidataLog, true)

    default: {
      const id = item?.mainsnak?.datavalue?.value?.id
      return await getWikidataLabel(id, wikidataLog)
    }
  }
}

const getDateDatum = (item) => {
  const { time: start, precision: startPrecision }: any =
    getDate(item?.mainsnak?.datavalue?.value) ||
    Object.keys(wikidataProperties)
      .filter((k) => wikidataProperties[k]?.label === 'start')
      .reduce((a, k) => getDate(item?.qualifiers?.[k]?.[0]?.datavalue?.value) || a, {})

  const { time: end, precision: endPrecision }: any = Object.keys(wikidataProperties)
    .filter((k) => wikidataProperties[k]?.label === 'end')
    .reduce((a, k) => getDate(item?.qualifiers?.[k]?.[0]?.datavalue?.value) || a, {})

  return {
    ...(start && { start }),
    ...(end && { end }),
    ...(startPrecision && { startPrecision }),
    ...(endPrecision && { endPrecision }),
  }
}

const getDate = (value) => {
  const { time, precision } = value || {}
  return time
    ? {
        ...(time && { time: getYear(time) }),
        ...(precision && { precision }),
      }
    : null
}

const getCoordinates = (obj) => {
  return obj && [obj?.longitude, obj?.latitude]
}

const getYear = (date) => {
  const strDate = date && date.toString()
  return date ? Number(strDate.slice(0, strDate.indexOf('-', 1))) : null
}

const getWikidataLabel = async (wikidataId, wikidataLog, getFullItem = false) => {
  if (!isWikidataId(wikidataId)) return ''

  if (wikidataId && wikidataItems?.[wikidataId]) return wikidataItems?.[wikidataId]

  if (getFullItem) return await fetchWikidataItem(wikidataId, wikidataLog)

  const label = await fetchWikidataLabel(wikidataId, wikidataLog)

  return label
}

const fetchWikidataItem = async (wikidataId, wikidataLog) =>
  fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&format=json&props=claims&origin=*`)
    .then((response) => response.json())
    .then(async (data) => {
      const label = await fetchWikidataLabel(wikidataId, () => null)

      const coordinates = await parseWikidataClaim(
        data?.entities?.[wikidataId]?.claims?.P625,
        false,
        'coordinates',
        () => null
      )

      wikidataLog({ wikidataId, label, coordinates })

      return label
    })

const fetchWikidataLabel = async (wikidataId, wikidataLog) =>
  fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&format=json&props=labels&languages=en&origin=*`
  )
    .then((response) => response.json())
    .then((data) => {
      const label = data?.entities?.[wikidataId]?.labels?.en?.value
      if (label) {
        wikidataItems[wikidataId] = label

        wikidataLog({ wikidataId, label })
        return label
      } else {
        return wikidataId
      }
    })

export default getWikidata
export { getWikidataLabel }
