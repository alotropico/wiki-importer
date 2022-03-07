import { useContext } from 'react'

import copyTextToClipboard from '../../utils/copyTextToClipboard'
import { AppContext } from '../../providers/Context'
import style from './style/SectionPlaces.module.scss'

export default function SectionPlaces() {
  const { wikidataExtra } = useContext(AppContext)

  const data = wikidataExtra.filter((item) => item?.coordinates)

  return (
    <section>
      <h3 className={style.title}>Places Fetched ({data.length})</h3>
      <textarea className={style.container} value={data.length ? JSON.stringify(data) : ''} readOnly />
      {!!wikidataExtra.length && (
        <div className={style.tools}>
          <span onClick={() => copyTextToClipboard(JSON.stringify(data))}>Copy</span>
        </div>
      )}
    </section>
  )
}
