import {putIn, patchIn, putInBy, negate, ifonly, not, val,
  isBoolean, isFunction, isDict, validate} from 'prax'

export function togglePopup (state, name) {
  return putInBy(state, ['popups', name], negate)
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

export function preventDefault (event) {
  event.preventDefault()
}

export function merge (...values) {
  return values.reduce(mergeTwo)
}

function mergeTwo (one, other) {
  return patchIn(one, [], toDict(other))
}

const toDict = ifonly(not(isDict), val({}))
