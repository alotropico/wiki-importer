import { useEffect, useRef } from 'react'

import Card from './components/card'
import useData from '../../hooks/useData'
import padNum from '../../utils/padNum'
import scrollTo from '../../utils/scrollTo'
import style from './style/SectionConsole.module.scss'

export default function SectionConsole() {
  const { data, queue, backlog } = useData()

  const ref = useRef<any>(null)

  const scrollHeight = ref?.current?.scrollHeight
  useEffect(() => {
    if (scrollHeight) scrollTo(ref.current, scrollHeight, 200)
  }, [scrollHeight])

  return (
    <section>
      <h3 className={style.title}>Console ({data.length})</h3>
      <div className={style.container} ref={ref}>
        {data.map((h) => (
          <Card key={h.id} item={h} />
        ))}
      </div>
      <div className={style.status}>
        Queued: {padNum(queue.length, 4)} | Fetched: {padNum(data.length, 4)} | Total: {padNum(backlog.length, 4)}
      </div>
    </section>
  )
}
