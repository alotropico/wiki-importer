import SectionHeader from '../section-header'
import SectionInput from '../section-input'
import SectionConsole from '../section-console'
import SectionOutput from '../section-output'
import SectionMessages from '../section-messages'

import style from './style/Dashboard.module.scss'
import { useState } from 'react'

export default function Dashboard() {
  const [queue, setQueue] = useState<any>([])

  const handleInput = (newItems) => {
    setQueue((queue) => [...queue, ...newItems])
  }

  return (
    <>
      <SectionHeader className={style.header} />

      <main className={style.main}>
        <SectionInput handleChange={handleInput} />
        <SectionConsole queue={queue} />
        <SectionOutput />
        <SectionMessages />
      </main>
    </>
  )
}
