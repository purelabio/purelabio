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

const {delayingWatch} = require('prax')
const {reactiveCreateClass, cachingTransformType, createCreateElement,
       renderingWatch} = require('prax/react')
const {routes} = require('./routes')

export function init (env) {
  const createClass = reactiveCreateClass(React.createClass, env)
  const transformType = cachingTransformType(createClass)
  React.createElement = createCreateElement(transformType)

  function renderRoot () {
    if (findRoot()) {
      render(routes, findRoot())
    }
  }

  env.addWatch('render', delayingWatch(renderingWatch(renderRoot)))

  // `renderRoot` must be qued to avoid accidental overlap with `renderingWatch`.
  env.enque(renderRoot)
}

const {env} = require('./core')

init(env)

/**
 * Utils
 */

function findRoot () {
  return document.getElementById('root')
}
