
import get from 'lodash/get'
import { initialState } from './selectors'
import {
  CUSTOM_READ_SUCCESS,
  CUSTOM_UPDATE_SUCCESS,
  CUSTOM_FILE_UPLOAD_SUCCESS,
} from './actions'

export default (state = initialState, { type, payload, meta }) => {
  const resource = get(meta, 'resource')

  if (!resource) {
    return state
  }

  switch (type) {
    case CUSTOM_READ_SUCCESS:
      return {
        ...state,
        [resource]: payload,
      }

    case CUSTOM_UPDATE_SUCCESS:
      return {
        ...state,
        [resource]: payload,
      }

    case CUSTOM_FILE_UPLOAD_SUCCESS:
      if (resource === 'organization/logoupload') {
        return {
          ...state,
          organization: {
            ...state.organization,
            logo: `${payload.url}?rnd=${Date.now()}`,
          },
        }
      }
      return state

    default:
      return state
  }
}
