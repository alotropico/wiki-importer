import style from './style/SectionAbout.module.scss'

export default function SectionAbout() {
  return (
    <section className={style.container}>
      <h4>Useful Tools</h4>
      <a href='https://query.wikidata.org/' target='_blank' rel='noreferrer'>
        Wikidata Query Tool
      </a>
      <a href='http://www.alotropico.com/projects/pattern-extractor/' target='_blank' rel='noreferrer'>
        Wikidata ids from string
      </a>
    </section>
  )
}
