const {render, unmountComponentAtNode} = require('react-dom')

if (module.hot) {
  module.hot.accept(err => {
    console.warn('Exception during HMR update.', err)
  })
  module.hot.dispose(() => {
    console.clear()
    teardownRender()
    if (typeof featureTeardown === 'function') featureTeardown()
  })
}

/**
 * Setup
 */

const {delayingWatch} = require('prax')
const {reactiveCreateClass, cachingTransformType, createCreateElement,
       renderingWatch} = require('prax/react')
const {routes} = require('./routes')
const {env, featureSetup} = require('./core')

const createClass = reactiveCreateClass(React.createClass, env)
const transformType = cachingTransformType(createClass)
React.createElement = createCreateElement(transformType)

function renderRoot () {
  if (findRoot()) render(routes, findRoot())
}

function teardownRender () {
  if (findRoot()) unmountComponentAtNode(findRoot())
  if (typeof env !== 'undefined') env.removeWatch('render')
}

env.addWatch('render', delayingWatch(renderingWatch(renderRoot)))

// `renderRoot` must be qued to avoid accidental overlap with `renderingWatch`.
env.enque(renderRoot)

const featureTeardown = featureSetup(env)

/**
 * Utils
 */

function findRoot () {
  return document.getElementById('root')
}
