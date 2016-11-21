import {putIn, isBoolean, isFunction, validate} from 'prax'

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

export function addEvent (target, eventName, fun, useCapture = false) {
  validate(isFunction, fun)
  validate(isBoolean, useCapture)

  target.addEventListener(eventName, fun, useCapture)

  return function removeEvent () {
    target.removeEventListener(eventName, fun, useCapture)
  }
}
