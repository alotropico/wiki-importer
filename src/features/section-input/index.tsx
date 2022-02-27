import { useEffect, useState } from 'react'

import useParseRaw from './hooks/useParseRaw'
import style from './style/SectionInput.module.scss'

export default function SectionInput({ handleChange }) {
  const [raw, setRaw] = useState('')

  const parsed = useParseRaw(raw)

  useEffect(() => {
    handleChange(parsed)
  }, [parsed])

  return (
    <section>
      <textarea
        placeholder='Paste JSON here...'
        className={style.textarea}
        onChange={(e) => setRaw(e.target.value)}
        defaultValue={demo}
      />
      <div className={style.controls} />
    </section>
  )
}

const demo = `[
	{
		"searchString": "Gaius Claudius Marcellus (consul 50 BC)",
		"position": "Consul",
		"year": -50
	},
	{ "searchString": "Julius Caesar", "position": "Consul", "year": -45 },
	{ "searchString": "Augustus", "position": "Consul suffectus", "year": -43 },
  { "searchString": "Aulus Hirtius", "position": "Consul", "year": -43 }
]`
