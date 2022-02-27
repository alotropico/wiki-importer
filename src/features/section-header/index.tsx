import style from './style/SectionHeader.module.scss'

export default function SectionHeader({ className }) {
  return (
    <header className={[style.container, className].join(' ')}>
      <div className={style.logo}>Wiki Importer</div>
    </header>
  )
}
