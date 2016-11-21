import {Atom, defonce, flat, seq} from 'prax'

const feats = flat([
  require('./features/misc'),
].filter(Boolean))

const extract = key => flat(feats.map(x => x[key]).filter(Boolean))

export const featureSetup = env => seq(...extract('setup').map(fun => fun(env)))

export const env = defonce(['env'], Atom)
