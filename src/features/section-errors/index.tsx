import { useContext } from 'react'

import { AppContext } from '../../providers/Context'
import style from './style/SectionErrors.module.scss'

export default function SectionErrors() {
  const { errors } = useContext(AppContext)

  return (
    <section>
      <h3 className={style.title}>Warnings ({errors.length})</h3>
      <div className={style.container}>
        {errors.map((item, i) => (
          <div key={i}>
            <a href={item.link} target='_blank' rel='noreferrer'>
              <span className={style.id}>{item.id}</span> <span className={style.desc}>{item.msg}</span>
            </a>
          </div>
        ))}
      </div>
      {!!errors.length && (
        <div className={style.tools}>
          <span>Copy</span>
        </div>
      )}
    </section>
  )
}
