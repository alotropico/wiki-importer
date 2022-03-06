import { useContext } from 'react'

import { AppContext } from '../../providers/Context'
import style from './style/SectionPlaces.module.scss'

export default function SectionPlaces() {
  const { wikidataExtra } = useContext(AppContext)

  const data = wikidataExtra.filter((item) => item?.coordinates)

  return (
    <section>
      <h3 className={style.title}>Places Fetched ({data.length})</h3>
      <textarea className={style.container} value={data.length ? JSON.stringify(data) : ''} readOnly />
      {/* data.map((item, i) => {
          const { label, coordinates } = item
          return (
            <div key={i} title={label}>
              <div>{label}</div> {coordinates && <div>({coordinates.join(' | ')})</div>}
            </div>
          )
        }) */}
      {!!wikidataExtra.length && (
        <div className={style.tools}>
          <span>Copy</span>
        </div>
      )}
    </section>
  )
}
