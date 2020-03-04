import {
  take, put, call, fork,
} from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { isBrowser } from 'config'
import * as actions from './actions'

export function* signinAuth(api, { data }, { thunk }) {
  try {
    const details = yield call([api, api.post], '/auth/login', data)

    if (isBrowser) {
      Cookies.set('token', details.token)
      api.setToken(details.token)
    }

    yield put(actions.authSigninSuccess(details, { data }, thunk))
  } catch (e) {
    yield put(actions.authSigninFailure(e, { data }, thunk))
  }
}

export function* readAuthUser(api, { thunk }) {
  try {
    // if (!(api.settings.headers && api.settings.headers.Authorization)) throw new Error('Not token')

    const user = yield call([api, api.get], '/users/me')
    yield put(actions.authUserReadSuccess(user, thunk))
  } catch (e) {
    yield put(actions.authUserReadFailure(e, thunk))
  }
}

export function* signoutAuth(api, { thunk }) {
  try {
    if (isBrowser) {
      Cookies.remove('token')
    }
    yield put(actions.authSignoutSuccess(thunk))
  } catch (e) {
    yield put(actions.authSignoutFailure(e, thunk))
  }
}

export function* watchAuthSigninRequest(api) {
  while (true) {
    const { payload, meta } = yield take(actions.AUTH_SIGNIN_REQUEST)
    yield call(signinAuth, api, payload, meta)
  }
}

export function* watchAuthUserReadRequest(api) {
  while (true) {
    const { meta } = yield take(actions.AUTH_USER_READ_REQUEST)
    yield call(readAuthUser, api, meta)
  }
}

export function* watchAuthSignoutRequest(api) {
  while (true) {
    const { meta } = yield take(actions.AUTH_SIGNOUT_REQUEST)
    yield call(signoutAuth, api, meta)
  }
}

export default function* ({ api }) {
  yield fork(watchAuthSigninRequest, api)
  yield fork(watchAuthUserReadRequest, api)
  yield fork(watchAuthSignoutRequest, api)
}
