import { useEffect, useState, useContext } from 'react'

import { AppContext } from '../../providers/Context'
import useParseRaw from './hooks/useParseRaw'
import style from './style/SectionInput.module.scss'
import demoData from './utils/demoData'

export default function SectionInput() {
  const [inputText, setInputText] = useState('')
  const [raw, setRaw] = useState('')

  const parsed = useParseRaw(raw)

  const { setInputItems } = useContext(AppContext)

  useEffect(() => {
    setInputItems(parsed)
  }, [parsed])

  useEffect(() => {
    const timeOut = setTimeout(() => setRaw(inputText), 200)
    return () => {
      clearTimeout(timeOut)
    }
  }, [inputText])

  useEffect(() => {
    setInputText(demoData)
  }, [])

  return (
    <section>
      <textarea
        placeholder={placeholder}
        className={style.textarea}
        onChange={(e) => setInputText(e.target.value)}
        defaultValue={demoData}
      />
    </section>
  )
}

const placeholder = `Write something to search here...

Names or Wikidata ids separated by colons, semicolons or newlines:

Marie Curie, Tyrannosaurus, Djibouti, Q1048, Q16...`
