import { useEffect, useState, useContext } from 'react'

import { AppContext } from '../../providers/Context'
import useParseRaw from './hooks/useParseRaw'
import style from './style/SectionInput.module.scss'

export default function SectionInput() {
  const [inputText, setInputText] = useState('')
  const [raw, setRaw] = useState('')

  const parsed = useParseRaw(raw)

  const { setInputItems } = useContext(AppContext)

  useEffect(() => {
    setInputItems(parsed)
  }, [parsed])

  useEffect(() => {
    const timeOut = setTimeout(() => setRaw(inputText), 1000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [inputText])

  useEffect(() => {
    setInputText(demo)
  }, [])

  return (
    <section>
      <textarea
        placeholder={placeholder}
        className={style.textarea}
        onChange={(e) => setInputText(e.target.value)}
        defaultValue={demo}
      />
    </section>
  )
}

const demo = '' //['Marie Curie', 'Isaac Newton', 'Q1048'].join(', ')

const placeholder = `Write something to search here...

Names or Wikidata ids separated by colons, semi-colons or newlines:
  Madam Curie, Tyrannosaurus, India

You can also paste a list in JSON format:
[
  {
    "id": "Julius Caesar",
    "place": "Rome"
  },
  {
    "id": "Q16",
    "language": "English"
  }
]`
