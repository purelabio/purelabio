import {putIn} from 'prax'

export function bindPopup (env, name, visible) {
  return {
    onClick: () => {env.swap(putIn, ['popups', name], visible)}
  }
}

export function bindValue (read, env, path) {
  return {
    value: read(...path) != null
      ? read(...path)
      : '',
    onChange: ({target: {value}}) => {env.swap(putIn, path, value)}
  }
}
