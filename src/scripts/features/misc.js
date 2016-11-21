import {putIn} from 'prax'
import {addEvent} from '../utils'

export function setup (env) {
  return addEvent(
    document,
    'keydown',
    ({keyCode}) => {
      if (keyCode === KEY_CODES.ESCAPE) env.swap(putIn, ['popups'], null)
    }
  )
}

const KEY_CODES = {
  ESCAPE: 27,
  UP:     38,
  DOWN:   40,
  J:      74,
  K:      75,
}
