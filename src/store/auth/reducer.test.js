import { initialState } from './selectors'
import * as actions from './actions'
import reducer from './reducer'

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

describe('AUTH_SIGNIN_SUCCESS', () => {
  it('adds the new data to the initial state', () => {
    expect(reducer(initialState, {
      type: actions.AUTH_SIGNIN_SUCCESS,
      payload: {
        user: { name: 'test' },
      },
    })).toEqual({
      ...initialState,
      user: { name: 'test' },
    })
  })

  it('prepends the new data to an existing state', () => {
    expect(reducer({
      ...initialState,
      user: { name: 'test' },
    }, {
      type: actions.AUTH_SIGNIN_SUCCESS,
      payload: { user: { name: 'test1' } },
    })).toEqual({
      ...initialState,
      user: { name: 'test1' },
    })
  })
})

describe('AUTH_USER_READ_SUCCESS', () => {
  it('sets user in the initial state', () => {
    expect(reducer(initialState, {
      type: actions.AUTH_USER_READ_SUCCESS,
      payload: { name: 'test' },
    })).toEqual({
      ...initialState,
      user: { name: 'test' },
    })
  })

  it('overrides user in an existing state', () => {
    expect(reducer({
      ...initialState,
      user: { name: 'test' },
    }, {
      type: actions.AUTH_USER_READ_SUCCESS,
      payload: { name: 'test1' },
    })).toEqual({
      ...initialState,
      user: { name: 'test1' },
    })
  })
})
