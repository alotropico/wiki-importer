import { createContext, useState, useEffect } from 'react'

import { AppContextProviderProps } from './types'

export const AppContext = createContext<any>({})

export default function AppContextProvider({ children }: AppContextProviderProps): React.ReactElement {
  const [playing, setPlaying] = useState(false)

  const [fetching, setFetching] = useState(false)

  const [inputItems, setInputItems] = useState<any>([])

  const [backlog, setBacklog] = useState<any>([]) // Items fetched and to fetch

  const [queue, setQueue] = useState<any>([]) // Items to fetch

  const [data, setData] = useState<any>([]) // Data fetched

  const [wikidataExtra, setWikidataExtra] = useState<any>([]) // Extra Wikidata items fetched

  const [errors, setErrors] = useState<any>([])

  useEffect(() => {
    if (!fetching && !queue.length) setPlaying(false)
  }, [fetching, playing])

  const contextMethods = {
    playing,
    setPlaying,
    fetching,
    setFetching,
    inputItems,
    setInputItems,
    backlog,
    setBacklog,
    queue,
    setQueue,
    data,
    setData,
    wikidataExtra,
    setWikidataExtra,
    errors,
    setErrors,
  }

  return <AppContext.Provider value={contextMethods}>{children}</AppContext.Provider>
}
