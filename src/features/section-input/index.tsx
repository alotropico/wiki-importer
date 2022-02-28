import { useEffect, useState } from 'react'

import useParseRaw from './hooks/useParseRaw'
import style from './style/SectionInput.module.scss'

export default function SectionInput({ handleChange }) {
  const [inputText, setInputText] = useState('')
  const [raw, setRaw] = useState('')

  const parsed = useParseRaw(raw)

  useEffect(() => {
    handleChange(parsed)
  }, [parsed])

  useEffect(() => {
    const timeOut = setTimeout(() => setRaw(inputText), 1000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [inputText])

  return (
    <section>
      <textarea
        placeholder='Paste JSON here...'
        className={style.textarea}
        onChange={(e) => setInputText(e.target.value)}
        defaultValue={demo}
      />
      <div className={style.controls} />
    </section>
  )
}

const demo = [
  'Marie Curie',
  'Isaac Newton',
  'Dostoevsky',
  'Pompey the Great',
  'Darius the Great',
  'Sappho',
  'Romulus',
  'Leonidas I',
  'Pythagoras',
  'Ptolemy I Soter',
].join(', ')

// const demo = JSON.stringify([
//   { id: 'Gaius Claudius Marcellus (consul 50 BC)', position: 'Consul', year: -50 },
//   { id: 'Julius Caesar', position: 'Consul', year: -45 },
//   { id: 'Augustus', position: 'Consul suffectus', year: -43 },
//   { id: 'Justinian I' },
//   { id: 'Socrates' },
//   { id: 'Alexander the great' },
// ])
