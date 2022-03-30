const wikidataProperties = {
  P31: { label: 'type', multi: true }, // instance of
  P279: { label: 'type', multi: true }, // subclass of

  P18: { label: 'image' },

  P276: { label: 'place', multi: true, type: 'place' }, // location
  P19: { label: 'birth', multi: true, type: 'place' }, // birth place
  P20: { label: 'death', multi: true, type: 'place' }, // place of death
  P551: { label: 'residence', multi: true, type: 'place' }, // residence

  P27: { label: 'country', multi: true, type: 'place' }, // country of citizenship
  P172: { label: 'ethnicity', multi: true }, // ethnic group
  P361: { label: 'set', multi: true }, // part of

  P571: { label: 'start', type: 'date' }, // inception
  P585: { label: 'start', type: 'date' }, // point in time
  P569: { label: 'start', type: 'date' }, // date of birth
  P580: { label: 'start', type: 'date' }, // start time

  P576: { label: 'end', type: 'date' }, // dissolved, abolished or demolished date
  P570: { label: 'end', type: 'date' }, // date of death
  P582: { label: 'end', type: 'date' }, // end time
  P746: { label: 'end', type: 'date' }, // date of disappearance

  P1317: { label: 'events', multi: true, type: 'event' }, // floruit

  P21: { label: 'gender' },

  P625: { label: 'coordinates', type: 'coordinates' },

  P1196: { label: 'mannerOfDeath' },
  P509: { label: 'causeOfDeath' },

  P103: { label: 'language', multi: true }, // native
  P1412: { label: 'otherLanguages', multi: true }, // spoken or written

  P106: { label: 'occupation', multi: true },
  P102: { label: 'faction', multi: true }, // political party
  P1142: { label: 'faction', multi: true }, // political ideology

  P1576: { label: 'lifestyle', multi: true },

  P39: { label: 'events', multi: true, type: 'event' }, // position held
  P793: { label: 'events', multi: true, type: 'event' }, // significant event
  P607: { label: 'events', multi: true, type: 'event' }, // conflict
}

export default wikidataProperties
