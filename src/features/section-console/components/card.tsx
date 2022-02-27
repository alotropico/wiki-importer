import style from '../style/SectionConsole.module.scss'

export default function Card({ item }) {
  const { id, ...rest } = item

  return (
    <div className={style.card}>
      {Object.keys(rest).map((k) => {
        const datum = rest[k]

        return <div key={k}>{parseDatum(k, datum)}</div>
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

    case 'array':
      return <div className={style.raw}>{JSON.stringify(datum)}</div>

    default:
      return (
        <>
          {k}: {JSON.stringify(datum)}
        </>
      )
  }
}

const formatters = {
  imageUrl: 'image',
  title: 'title',
  pageid: 'wikipediaId',
  wikidataId: 'wikidataId',
  extract: 'brief',
  claims: 'array',
  ns: null,
}

function A({ href, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  )
}
