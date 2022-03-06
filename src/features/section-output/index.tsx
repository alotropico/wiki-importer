import { useContext } from 'react'
import { AppContext } from '../../providers/Context'
import style from './style/SectionOutput.module.scss'

export default function SectionOutput() {
  const { data } = useContext(AppContext)

  return (
    <section>
      <h3>Output ({data.length})</h3>
      <textarea className={style.container} readOnly value={data.length ? JSON.stringify(data) : ''} />

      <div className={style.tools}>
        {!!data.length && (
          <>
            <span>Copy</span>
            <span>Save</span>
          </>
        )}
      </div>
    </section>
  )
}
