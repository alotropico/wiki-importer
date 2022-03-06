import { useContext } from 'react'

import { AppContext } from '../../providers/Context'
import extUrl from '../../utils/extUrl'
import style from './style/SectionMessages.module.scss'

export default function SectionMessages() {
  const { wikidataExtra } = useContext(AppContext)

  return (
    <section>
      <h3 className={style.title}>Children Fetched ({wikidataExtra.length})</h3>
      <div className={style.container}>
        {wikidataExtra.map((item, i) => {
          const { wikidataId, label, coordinates } = item
          return (
            <div key={i} title={label} className={coordinates && style.place}>
              <span>
                <a href={extUrl(wikidataId)} target='_blank' rel='noreferrer'>
                  {wikidataId}
                </a>
                :
              </span>{' '}
              <span>{label}</span>
            </div>
          )
        })}
      </div>
      {!!wikidataExtra.length && (
        <div className={style.tools}>
          <span>Copy w/o Places</span>
          <span>Copy All</span>
        </div>
      )}
    </section>
  )
}
