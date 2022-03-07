import { useContext } from 'react'

import copyTextToClipboard from '../../utils/copyTextToClipboard'
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
          <span onClick={() => copyTextToClipboard(objArrayToText(wikidataExtra.filter((i) => !i?.coordinates)))}>
            Copy w/o places
          </span>
          <span onClick={() => copyTextToClipboard(objArrayToText(wikidataExtra))}>Copy All</span>
        </div>
      )}
    </section>
  )
}

const objArrayToText = (ar) =>
  ar.map((i) => `${i?.wikidataId}: ${i?.label}` + (i?.coordinates ? ', // place' : ',')).join('\n')
