import * as selectors from './selectors'

test('initialState', () => {
  expect(selectors.initialState).toEqual({
    user: null,
  })
})

test('getUser', () => {
  expect(selectors.getUser({})).toBe(selectors.initialState.user)
  expect(selectors.getUser()).toBe(selectors.initialState.user)
  expect(selectors.getUser(selectors.initialState)).toBe(selectors.initialState.user)
})
