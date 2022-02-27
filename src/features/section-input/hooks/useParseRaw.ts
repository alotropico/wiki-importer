import { useEffect, useState } from 'react'

export default function useParseRaw(raw) {
  const [parsed, setParsed] = useState([])

  useEffect(() => {
    setParsed(parseRaw(raw))
  }, [raw])

  return parsed
}

const parseRaw = (raw) => {
  try {
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}
