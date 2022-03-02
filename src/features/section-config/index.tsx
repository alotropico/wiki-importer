import { useContext } from 'react'
import { AppContext } from '../../providers/Context'

import Icon from '../../components/icons'
import style from './style/SectionConfig.module.scss'

export default function SectionConfig() {
  const { playing, setPlaying, fetching, queue, backlog } = useContext(AppContext)

  const status = fetching ? 'fetching' : queue.length ? 'hold' : backlog.length && !queue.length ? 'done' : 'start'

  const msg = getMsg(status, queue, backlog)

  return (
    <section className={style.container}>
      <div className={style.row}>
        <span className={style.button} onClick={() => setPlaying(!playing)}>
          {playing ? <Icon name='pause' /> : <Icon name='play' />}
        </span>
        <span className={style[status]}>{msg}</span>
      </div>
    </section>
  )
}

const getMsg = (status, queue, backlog) => {
  switch (status) {
    case 'fetching':
      return `Fetching... (${queue.length} remaining)`

    case 'hold':
      return `On hold... (${queue.length} remaining)`

    case 'done':
      return `All done! (${backlog.length} items)`

    default:
      return 'Press the button to start fetching.'
  }
}
