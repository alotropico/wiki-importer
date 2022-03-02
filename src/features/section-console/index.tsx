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
      <div className={style.container} ref={ref}>
        {data.map((h) => (
          <Card key={h.id} item={h} />
        ))}
      </div>
      <div className={style.status}>
        Queue: {padNum(queue.length, 3)} | Fetched: {padNum(data.length, 3)} | Total: {padNum(backlog.length, 3)}
      </div>
    </section>
  )
}
