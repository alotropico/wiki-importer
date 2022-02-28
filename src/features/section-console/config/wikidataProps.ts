const wikidataProperties = {
  P21: { label: 'gender' },
  P31: { label: 'type' }, // instance of

  P27: { label: 'set', multi: true }, // country of citizenship
  P172: { label: 'set', multi: true }, // ethnic group

  P569: { label: 'start', type: 'date' },
  P580: { label: 'start', type: 'date' },
  P570: { label: 'end', type: 'date' },
  P582: { label: 'end', type: 'date' },

  P106: { label: 'Occupation', multi: true },

  P19: { label: 'place', multi: true }, // birth place
  P20: { label: 'place', multi: true }, // place of death
  P551: { label: 'place', multi: true }, // residence

  P1196: { label: 'mannerOfDeath' },
  P509: { label: 'causeOfDeath' },
  P103: { label: 'language', multi: true }, // native
  P1412: { label: 'language', multi: true }, // spoken or written
  P39: { label: 'events', multi: true, type: 'event' }, // position held
  P102: { label: 'faction', multi: true }, // political party
  P607: { label: 'conflict', multi: true, type: 'event' },
  P793: { label: 'event', multi: true },
}

export default wikidataProperties
