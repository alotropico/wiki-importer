import { useEffect, useState } from 'react'

export default function useParseRaw(raw) {
  const [parsed, setParsed] = useState<any>([])

  useEffect(() => {
    setParsed(parseRaw(raw))
  }, [raw])

  return parsed
}

const parseRaw = (raw) => {
  try {
    const parse = JSON.parse(raw)
    return cleanArray(Array.isArray(parse) ? parse : [parse])
  } catch (e) {
    return cleanArray(raw.split(/[\n,;:]/))
  }
}

const cleanArray = (ar) => ar.filter((d) => d.trim()).map((d) => ({ id: d.replaceAll('"', '').trim() }))
