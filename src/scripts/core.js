import {global, Atom, defonce, getIn, putIn, flat, seq, isFunction} from 'prax'
import {merge} from './utils'

export const env = defonce(global, ['app', 'env'], Atom)

/**
 * Setup
 */

const extract = (features, key) => flat(features.map(x => x[key]).filter(Boolean))

export function featureSetup (env, features) {
  // Side-effectful functions that react to data changes
  env.watchers = extract(features, 'watchers')

  // Initial state
  env.state = merge(...extract(features, 'defaults'), env.state)

  return seq(...extract(features, 'setup').map(fun => fun(env)).filter(isFunction))
}

/**
 * Debug
 */

window.app = {
  ...window.app, env,
  read () {
    return getIn(env.state, arguments)
  },
  set (...path) {
    env.swap(putIn, path, path.pop())
  }
}
