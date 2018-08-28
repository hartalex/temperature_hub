import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './components/app/App.js'
import registerServiceWorker from './registerServiceWorker.js'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
