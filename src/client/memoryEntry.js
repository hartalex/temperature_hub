import { renderRoot } from './components/memoryEntry.js'
import { render } from 'react-dom'
import 'whatwg-fetch'

var root = document.getElementById('root')
if (root !== null) {
  render(renderRoot(), root)
}
