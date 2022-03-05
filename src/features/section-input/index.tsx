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

const demo = '' // 'Carthage, Scipio Africanus, Hannibal, Hasdrubal the Fair, Q311702, Q312306, Q315274, Q335604, Q382007, Q382276, Q452048, Q463438, Q554632, Q561677, Q580979, Q857028, Q867394, Q935520, Q962753, Q1347118, Q1491511, Q1592862, Q1738423, Q1981450, Q2902213, Q4118145, Q4281819, Q5638907, Q5849589, Q5970111, Q6744857, Q8964159, Q9003822, Q11682330, Q11948158, Q18812167, Q102350968'

const placeholder = `Write something to search here...

Names or Wikidata ids: Madam Curie, Tyrannosaurus, India

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
