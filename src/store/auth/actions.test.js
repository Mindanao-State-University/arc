import * as actions from './actions'

test('authSigninRequest', () => {
  expect(actions.authSigninRequest({ title: 'test' })).toEqual({
    type: actions.AUTH_SIGNIN_REQUEST,
    payload: { data: { title: 'test' } },
    meta: {
      thunk: 'AuthSignIn',
    },
  })
})

test('authSigninSuccess', () => {
  expect(actions.authSigninSuccess({ id: 1, title: 'test' }, { title: 'test' }, 'test')).toEqual({
    type: actions.AUTH_SIGNIN_SUCCESS,
    payload: { id: 1, title: 'test' },
    meta: {
      request: { title: 'test' },
      thunk: 'test',
    },
  })
})

test('authSigninFailure', () => {
  expect(actions.authSigninFailure('error', 'test', 'test')).toEqual({
    type: actions.AUTH_SIGNIN_FAILURE,
    error: true,
    payload: 'error',
    meta: {
      request: 'test',
      thunk: 'test',
    },
  })
})

test('authUserReadRequest', () => {
  expect(actions.authUserReadRequest({})).toEqual({
    type: actions.AUTH_USER_READ_REQUEST,
    payload: {},
    meta: {
      thunk: 'AuthUserRead',
    },
  })
})

test('authUserReadSuccess', () => {
  expect(actions.authUserReadSuccess({ user: { name: 'test' }, token: 'test' }, 'test')).toEqual({
    type: actions.AUTH_USER_READ_SUCCESS,
    payload: {
      user: { name: 'test' },
      token: 'test',
    },
    meta: {
      thunk: 'test',
    },
  })
})

test('authUserReadFailure', () => {
  expect(actions.authUserReadFailure('error', 'test')).toEqual({
    type: actions.AUTH_USER_READ_FAILURE,
    error: true,
    payload: 'error',
    meta: {
      thunk: 'test',
    },
  })
})
