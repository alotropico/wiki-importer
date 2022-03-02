import { useEffect, useContext } from 'react'

import { AppContext } from '../providers/Context'
import getWiki from '../api/getWiki'

export default function useData() {
  const { inputItems, playing, setFetching, backlog, setBacklog, queue, setQueue, data, setData } =
    useContext(AppContext)

  useEffect(() => {
    const newItems = inputItems.filter((item) => !backlog.find((bItem) => bItem.id === item.id))
    if (newItems.length) {
      setQueue((queue) => [...queue, ...newItems])
      setBacklog((backlog) => [...backlog, ...newItems])
    }
  }, [JSON.stringify(inputItems)])

  useEffect(() => {
    if (playing && queue.length) fetchItem()
  }, [queue.length, playing])

  const wikidataLog = (logItem) => {
    console.log(logItem)
  }

  const fetchItem = () => {
    setFetching(true)

    // Fetched item stays in the queue until done
    const nextItem = queue?.[0] || {}

    const { id } = nextItem

    // create new item by id in data collection
    pushData({ id })

    getWiki(id, pushData, wikidataLog).then(async () => {
      // Add properties from user input data
      pushData(nextItem, id)
      // Remove item from queue
      setQueue((queue) => queue.slice(1))
      // Fetching stopped
      setFetching(false)
    })
  }

  const pushData = (datum, create = false) =>
    setData((data) =>
      create ? data.map((item) => (item.id === create ? { ...item, ...datum } : item)) : [...data, datum]
    )

  return { data, queue, backlog }
}
