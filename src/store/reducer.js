
import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'
import { reducer as thunk } from 'redux-saga-thunk'

const reducers = {
  thunk,
}

const req = require.context('.', true, /\.\/.+\/reducer\.js$/)

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
  reducers[storeName] = req(key).default
})

const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
  let finalState = state
  if (action.type === 'AUTH_SIGNOUT_REQUEST') {
    finalState = window.__INITIAL_STATE__ // eslint-disable-line no-underscore-dangle
  }

  return appReducer(finalState, action)
}

export default rootReducer
