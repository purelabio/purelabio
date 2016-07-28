import 'simple-pjax'
import 'promise/polyfill'
import {render, unmountComponentAtNode} from 'react-dom'
import {applyToSelector, onload, domEvent} from 'tobox/js'

// This must be executed before evaluating other modules.
if (module.hot) {
  module.hot.accept(err => {
    console.warn('Exception during HMR update.', err)
  })
}