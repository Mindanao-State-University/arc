import React from 'react'
import routes from 'routes'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

const App = () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </Router>
)

export default App

