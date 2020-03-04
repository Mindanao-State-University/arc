import { initialState } from './selectors'
import { NOTIFICATION_SEND, NOTIFICATION_DISMISS, NOTIFICATION_CLEAR } from './actions'

export default (state = initialState, { type, payload }) => {
  if (!payload || !type) return state

  switch (type) {
    case NOTIFICATION_SEND:
      return [
        payload,
        // ...state,
      ]
    case NOTIFICATION_DISMISS:
      return []
      // return [...state.filter(({ id }) => id !== payload)]
    case NOTIFICATION_CLEAR:
      return []
    default:
      return state
  }
}
