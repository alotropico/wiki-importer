import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// TODOS
// avoid repeating children wikidata fetches
// get coordinate location and point in time https://www.wikidata.org/wiki/Q6959206
// fetch places with coordinates into a different JSON file

// review extract parsing
// include floruit as event
// distinguish circa from precise dates
// excludes
// parse disambiguation pages as errors
// interrupt then chains when error occurs
