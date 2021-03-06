import SectionHeader from '../section-header'
import SectionInput from '../section-input'
import SectionConfig from '../section-config'
import SectionConsole from '../section-console'
import SectionOutput from '../section-output'
import SectionMessages from '../section-messages'
import SectionAbout from '../section-about'
import SectionPlaces from '../section-places'

import style from './style/Dashboard.module.scss'
import SectionErrors from '../section-errors'

export default function Dashboard() {
  return (
    <>
      <main className={style.main}>
        <SectionHeader />
        <SectionInput />
        <SectionConfig />
        <SectionErrors />
        <SectionConsole />
        <SectionOutput />
        <SectionMessages />
        <SectionPlaces />
        <SectionAbout />
      </main>
    </>
  )
}
