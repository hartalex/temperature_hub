import React from 'react'
import ReactDOM from 'react-dom'

export function renderTest(Component, store) {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Component store={store} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
}
