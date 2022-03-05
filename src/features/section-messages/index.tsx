import { useContext } from 'react'

import { AppContext } from '../../providers/Context'
import style from './style/SectionMessages.module.scss'

export default function SectionMessages() {
  const { wikidataExtra } = useContext(AppContext)

  return (
    <section>
      <h3 className={style.title}>Extra Children Fetched ({wikidataExtra.length})</h3>
      <div className={style.container}>
        {wikidataExtra.map((item, i) => {
          const key = Object.keys(item)[0]
          return (
            <div key={i} title={item[key]}>
              <span>{key}:</span> <span>{item[key]}</span>
            </div>
          )
        })}
      </div>
      {!!wikidataExtra.length && (
        <div className={style.tools}>
          <span>Copy</span>
        </div>
      )}
    </section>
  )
}
