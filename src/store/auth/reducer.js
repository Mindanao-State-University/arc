import { initialState } from './selectors'
import {
  AUTH_SIGNIN_SUCCESS,
  AUTH_USER_READ_SUCCESS,
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload.user || state.user,
      }

    case AUTH_USER_READ_SUCCESS:
      return {
        ...state,
        user: payload,
      }

    default:
      return state
  }
}
