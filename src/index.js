import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import configureStore from 'store/configure'
import api from 'services/api'
import App from 'App'
import * as serviceWorker from 'serviceWorker'
import { ThemeProvider } from '@material-ui/core/styles'
import { basename } from 'config'
import { theme } from 'services/theme'

const apiProvider = api.create()
if (Cookies.get('token')) {
  apiProvider.setToken(Cookies.get('token'))
}

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, { api: apiProvider })

const renderApp = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(renderApp(), document.getElementById('root'));


serviceWorker.unregister();
