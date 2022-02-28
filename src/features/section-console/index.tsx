import { useEffect, useRef, useState } from 'react'

import Card from './components/card'
import getWiki from './api/getWiki'
import style from './style/SectionConsole.module.scss'

export default function SectionConsole({ queue }) {
  const ref = useRef<any>(null)
  const [cue, setCue] = useState(queue)

  const [backlog, setBacklog] = useState(queue)

  const [data, setData] = useState<any>([])

  const fetchItem = () => {
    const nextItem = cue?.[0] || {}

    const { id } = nextItem

    // create new item by id in data collection
    pushData({ id })

    getWiki(id, pushData).then(async () => {
      // Add properties from user input data
      pushData(nextItem, id)
      // Remove item from cue
      setCue((cue) => cue.slice(1))
    })
  }

  const pushData = (datum, id = false) =>
    setData((data) => {
      return id ? data.map((item) => (item.id === id ? { ...item, ...datum } : item)) : [...data, datum]
    })

  const scrollHeight = ref?.current?.scrollHeight
  useEffect(() => {
    if (scrollHeight) scrollTo(ref.current, scrollHeight, 200)
  }, [scrollHeight])

  useEffect(() => {
    const newItems = queue.filter((item) => !backlog.find((bItem) => bItem.id === item.id))
    if (newItems.length) {
      setCue((cue) => [...cue, ...newItems])
      setBacklog((cue) => [...cue, ...newItems])
    }
  }, [JSON.stringify(queue)])

  useEffect(() => {
    if (cue.length) fetchItem()
  }, [JSON.stringify(cue)])

  return (
    <section>
      <div className={style.container} ref={ref}>
        {data.map((h) => (
          <Card key={h.id} item={h} />
        ))}
      </div>
      <div className={style.status}>
        Cued: {pad(cue.length, 3)} | Fetched: {pad(data.length, 3)} | Total: {pad(backlog.length, 3)}
      </div>
    </section>
  )
}

const scrollTo = (element, to, duration) => {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

const pad = (num, size) => {
  const s = '00000000' + num
  return s.substr(s.length - size)
}
