import {global, Atom, getIn, putIn, defonce, flat, seq} from 'prax'

const feats = flat([
  require('./features/misc'),
].filter(Boolean))

const extract = key => flat(feats.map(x => x[key]).filter(Boolean))

export const featureSetup = env => seq(...extract('setup').map(fun => fun(env)))

export const env = defonce(global, ['env'], Atom)

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
