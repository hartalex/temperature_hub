import { renderRoot } from './components/index.js'
import { render } from 'react-dom'
import 'whatwg-fetch'
// import temperatureGraph from './temperatureGraph'
// import doorGraph from './doorGraph'
// import Analytics from './components/analytics.js'
// Analytics.analytics()

var root = document.getElementById('root')
if (root !== null) {
  render(renderRoot(), root)
}
