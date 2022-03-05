import style from './style/SectionAbout.module.scss'

export default function SectionAbout() {
  return (
    <section className={style.container}>
      <h4>Useful Tools</h4>

      <a
        href='https://query.wikidata.org/#SELECT%20%3Fitem%20WHERE%20%7B%0A%3Fitem%20wdt%3AP607%20wd%3AQ6271%20.%0A%20%20%7D'
        target='_blank'
        rel='noreferrer'>
        Wikidata Query Tool
      </a>

      <a href='https://www.alotropico.com/projects/pattern-extractor/' target='_blank' rel='noreferrer'>
        Wikidata ids from string
      </a>

      <a href='https://wikidata.org/' target='_blank' rel='noreferrer'>
        Wikidata
      </a>

      <div className={[style.horizontal, style.break].join(' ')}>
        <a href='https://github.com/alotropico/wiki-importer' target='_blank' rel='noreferrer'>
          Github repository
        </a>

        <a href='http://www.alotropico.com/' target='_blank' rel='noreferrer'>
          By @alotropico
        </a>
      </div>
    </section>
  )
}
