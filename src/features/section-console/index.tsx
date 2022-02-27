import { useEffect, useState } from 'react'

import Card from './components/card'
import getWiki from './api/getWiki'
import style from './style/SectionConsole.module.scss'

export default function SectionConsole({ queue }) {
  const [cue, setCue] = useState(queue)

  const [backlog, setBacklog] = useState(queue)

  const [data, setData] = useState<any>([])

  const fetchItem = () => {
    const nextItem = cue?.[0] || {}

    const { searchString: id } = nextItem

    pushData({ id })

    getWiki(id, pushData).then(() => {
      pushData(nextItem, id)
      setCue((cue) => cue.slice(1))
    })
  }

  const pushData = (datum, id = false) =>
    setData((data) => {
      return id ? data.map((item) => (item.id === id ? { ...item, ...datum } : item)) : [...data, datum]
    })

  useEffect(() => {
    const newItems = queue.filter((item) => !backlog.find((bItem) => bItem.searchString === item.searchString))
    if (newItems.length) {
      setCue((cue) => [...cue, ...newItems])
      setBacklog((cue) => [...cue, ...newItems])
    }
  }, [JSON.stringify(queue)])

  useEffect(() => {
    if (cue.length) fetchItem()
  }, [JSON.stringify(cue)])

  return (
    <section className={style.container}>
      {data.map((h) => (
        <Card key={h.id} item={h} />
      ))}
    </section>
  )
}
