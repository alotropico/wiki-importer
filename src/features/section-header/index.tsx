import style from './style/SectionHeader.module.scss'

export default function SectionHeader() {
  return (
    <header className={[style.container].join(' ')}>
      <div className={style.logo}>Wiki Importer</div>
    </header>
  )
}
