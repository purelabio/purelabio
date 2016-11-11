import {render, unmountComponentAtNode} from 'react-dom'

if (module.hot) {
  module.hot.accept(err => {
    console.warn('Exception during HMR update.', err)
  })
  module.hot.dispose(() => {
    console.clear()
    unmountComponentAtNode(document.getElementById('root'))
  })
}

const {routes} = require('./routes')

render(routes, document.getElementById('root'))
