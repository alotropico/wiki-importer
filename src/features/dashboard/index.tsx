import SectionHeader from '../section-header'
import SectionInput from '../section-input'
import SectionConfig from '../section-config'
import SectionConsole from '../section-console'
import SectionOutput from '../section-output'
import SectionMessages from '../section-messages'
import SectionAbout from '../section-about'

import style from './style/Dashboard.module.scss'

export default function Dashboard() {
  return (
    <>
      <main className={style.main}>
        <SectionInput />
        <SectionConfig />
        <SectionConsole />
        <SectionOutput />
        <SectionMessages />
        <SectionHeader />
        <SectionAbout />
      </main>
    </>
  )
}
