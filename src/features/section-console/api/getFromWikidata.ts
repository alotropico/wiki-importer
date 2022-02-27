const getFromWikidata = async (id) => {
  return fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&format=json&props=claims&origin=*`)
    .then((response) => response.json())
    .then((data) => {
      const claims = data?.entities?.[id]?.claims
      if (claims) {
        console.log(parseWikidataClaims(claims))
        return parseWikidataClaims(claims)
      } else {
        return 'Something went wrong'
      }
    })
}

const parseWikidataClaims = (claims) =>
  Object.keys(claims).map((k) => parseWikidataClaim(k, claims[k])) || ['No claims']

const parseWikidataClaim = (k, claim) => ({
  property: k,
  items: claim.map((item) => ({ value: item?.mainsnak?.datavalue })),
})

const wikidataProperties = {
  P21: { label: 'gender' },
  P31: { label: 'type' }, // instance of
  P27: { label: 'set', multi: true }, // country of citizenship
  P569: { label: 'start', type: 'date' },
  P570: { label: 'end', type: 'date' },
  P19: { label: 'place', multi: true }, // birth place
  P20: { label: 'place', multi: true }, // place of death
  P1196: { label: 'mannerOfDeath' },
  P509: { label: 'causeOfDeath' },
  P103: { label: 'language', multi: true }, // native
  P1412: { label: 'language', multi: true }, // spoken or written
  P39: { label: 'events', multi: true, type: 'date' }, // position held
  P102: { label: 'faction', multi: true }, // political party
  P607: { label: 'conflict', multi: true, type: 'date' },
  P793: { label: 'event', multi: true },
}

export default getFromWikidata
