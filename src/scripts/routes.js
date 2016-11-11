import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {Root} from './views/root'
import {Index} from './views/index'

export const routes = (
  <Router history={browserHistory} createElement={createElement}>
    <Route path='/' component={Root}>
      <IndexRoute path='' component={Index} />
    </Route>
  </Router>
)

// By dynamically reading `React.createElement`, this ensures the router uses
// the "hacked" version.
function createElement () {
  return React.createElement(...arguments)
}
