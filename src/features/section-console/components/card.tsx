import style from '../style/SectionConsole.module.scss'

export default function Card({ item }) {
  const { id, ...rest } = item

  return (
    <div className={style.card}>
      {Object.keys(rest).map((k) => {
        const datum = rest[k]

        return datum ? <div key={k}>{parseDatum(k, datum)}</div> : null
      })}
    </div>
  )
}

const parseDatum = (k, datum) => {
  const format = formatters?.[k]

  switch (format) {
    case 'image':
      return datum?.toString().match(/\.(jpeg|jpg|gif|png)$/) != null ? (
        <img src={datum} className={style.image} />
      ) : (
        <></>
      )

    case 'wikipediaId':
      return (
        <div className={style.info}>
          Wikipedia: <A href={`https://en.wikipedia.org/wiki?curid=${datum}`}>{datum}</A>
        </div>
      )

    case 'wikidataId':
      return (
        <div className={style.info}>
          Wikidata: <A href={`https://www.wikidata.org/wiki/${datum}`}>{datum}</A>
        </div>
      )

    case 'title':
      return <h2>{datum}</h2>

    case 'text':
      return datum

    case 'brief':
      return <p className={style.brief}>{datum}</p>

    case 'error':
      return <p className={style.error}>{datum}</p>

    case 'object':
    case 'array':
      return (
        <div className={style.raw}>
          <Datum d={datum} />
        </div>
      )

    default:
      return (
        <div className={style.default}>
          <span className={style.key}>{k}:</span> <Datum d={datum} />
        </div>
      )
  }
}

const Datum = ({ d }: any) => {
  return d === null ? null : Array.isArray(d) ? (
    <div className={style.array}>
      {d.map((it, i) => (
        <div key={i}>
          <Datum d={it} />
        </div>
      ))}
    </div>
  ) : typeof d === 'object' ? (
    <>
      {Object.keys(d).map((k) => {
        const className = [k === 'error' ? style.error : ''].join('')
        return (
          <div key={k} className={className}>
            <span className={style.key}>{k}:</span> <Datum d={d[k]} />
          </div>
        )
      })}
    </>
  ) : (
    <>{d}</>
  )
}

const formatters = {
  imageUrl: 'image',
  title: 'title',
  pageid: 'wikipediaId',
  wikidataId: 'wikidataId',
  extract: 'brief',
  claims: 'object',
  error: 'error',
  ns: null,
}

function A({ href, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  )
}
