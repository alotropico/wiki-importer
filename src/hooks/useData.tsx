import { useEffect, useContext } from 'react'

import { AppContext } from '../providers/Context'
import getWiki from '../api/getWiki'

export default function useData() {
  const {
    inputItems,
    playing,
    setFetching,
    backlog,
    setBacklog,
    queue,
    setQueue,
    data,
    setData,
    setWikidataExtra,
    setErrors,
  } = useContext(AppContext)

  useEffect(() => {
    const newItems = inputItems.filter((item) => !data.find((bItem) => bItem.id === item.id))
    //if (newItems.length) {
    setQueue(newItems)
    //setBacklog((backlog) => [...backlog, ...newItems])
    //}
  }, [JSON.stringify(inputItems)])

  useEffect(() => {
    if (playing && queue.length) fetchItem()
  }, [queue.length, playing])

  const errorLog = (error) => {
    if (error) setErrors((errors) => [...errors, error])
  }

  const wikidataLog = (logItem) => {
    setWikidataExtra((wiki) => [...wiki, logItem])
  }

  const fetchItem = () => {
    setFetching(true)

    // Fetched item stays in the queue until done
    const nextItem = queue?.[0] || {}

    const { id } = nextItem

    // create new item by id in data collection

    getWiki(id, pushData, wikidataLog, errorLog).then(async () => {
      // Add properties from user input data if it has any other than id
      if (Object.keys(nextItem).length > 1) pushData(nextItem, id)
      // Remove item from queue
      setQueue((queue) => queue.slice(1))
      // Fetching stopped
      setFetching(false)
    })
  }

  const pushData = (datum, id) => {
    if (datum)
      setData((data) => {
        return !data.find((item) => item.id === id)
          ? [...data, { ...datum, id }]
          : data.map((item) => (item.id === id ? { ...item, ...datum } : item))
      })
  }

  return { data, queue, backlog }
}
