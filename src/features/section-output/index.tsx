import { useContext } from 'react'

import copyTextToClipboard from '../../utils/copyTextToClipboard'
import downloadJson from '../../utils/downloadJson'
import { AppContext } from '../../providers/Context'
import style from './style/SectionOutput.module.scss'

export default function SectionOutput() {
  const { data } = useContext(AppContext)

  const json = JSON.stringify(data)

  return (
    <section>
      <h3>Output ({data.length})</h3>
      <textarea className={style.container} readOnly value={data.length ? json : ''} />

      <div className={style.tools}>
        {!!data.length && (
          <>
            <span onClick={() => copyTextToClipboard(json)}>Copy</span>
            <span onClick={() => downloadJson(json, 'wiki-importer.json', 'text/plain')}>Save</span>
          </>
        )}
      </div>
    </section>
  )
}
