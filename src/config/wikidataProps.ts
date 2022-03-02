const wikidataProperties = {
  P31: { label: 'type', multi: true }, // instance of

  P19: { label: 'place', multi: true }, // birth place
  P20: { label: 'place', multi: true }, // place of death
  P551: { label: 'place', multi: true }, // residence

  P27: { label: 'set', multi: true }, // country of citizenship
  P172: { label: 'set', multi: true }, // ethnic group

  P569: { label: 'start', type: 'date' },
  P580: { label: 'start', type: 'date' },
  P570: { label: 'end', type: 'date' },
  P582: { label: 'end', type: 'date' },

  P21: { label: 'gender' },

  P1196: { label: 'mannerOfDeath' },
  P509: { label: 'causeOfDeath' },

  P103: { label: 'language', multi: true }, // native
  P1412: { label: 'language', multi: true }, // spoken or written

  P106: { label: 'occupation', multi: true },
  P102: { label: 'faction', multi: true }, // political party

  P39: { label: 'events', multi: true, type: 'event' }, // position held
  P793: { label: 'events', multi: true, type: 'event' },
  P607: { label: 'events', multi: true, type: 'event' },
}

export default wikidataProperties
