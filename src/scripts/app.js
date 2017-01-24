const {render, unmountComponentAtNode} = require('react-dom')

let featureTeardown
let removeRenderWatcher

if (module.hot) {
  module.hot.accept(err => {
    console.warn('Exception during HMR update.', err)
  })
  module.hot.dispose(() => {
    console.clear()
    if (typeof featureTeardown === 'function') featureTeardown()
    if (typeof removeRenderWatcher === 'function') removeRenderWatcher()
    unmountComponentAtNode(findRoot())
  })
}

/**
 * Setup
 */

const {env, featureSetup} = require('./core')

// true = use subdirectories
const requireContext = require.context('./features', true, /\.js$/)

const features = requireContext.keys().map(requireContext)

/**
 * Rendering
 */

const {delayingWatcher, seq} = require('prax')
const {reactiveCreateClass, cachingTransformType, createCreateElement,
       renderingWatcher} = require('prax/react')
const {routes} = require('./routes')

const createClass = reactiveCreateClass(React.createClass, env)

const transformType = cachingTransformType(createClass)

React.createElement = createCreateElement(transformType)

function renderRoot () {
  if (findRoot()) render(routes, findRoot())
}

function findRoot () {
  return document.getElementById('root')
}

/**
 * Init
 */

env.enque(function init () {
  featureTeardown = featureSetup(env, features)

  env.notifyWatchers(env.state, env.state)

  removeRenderWatcher = env.addWatcher(delayingWatcher(seq(renderingWatcher, renderRoot)))

  renderRoot()
})

/**
 * Debug
 */

if (window.devMode) {
  ['log', 'info', 'warn', 'error', 'clear'].forEach(key => {
    if (!/bound/.test(console[key].name)) {
      window[key] = console[key] = console[key].bind(console)
    }
  })
  _.assign(window, window.app)
}
