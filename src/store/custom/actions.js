
export const CUSTOM_READ_REQUEST = 'CUSTOM_READ_REQUEST'
export const CUSTOM_READ_SUCCESS = 'CUSTOM_READ_SUCCESS'
export const CUSTOM_READ_FAILURE = 'CUSTOM_READ_FAILURE'

export const customReadRequest = (resource, params) => ({
  type: CUSTOM_READ_REQUEST,
  payload: { params },
  meta: {
    resource,
    thunk: `${resource}CustomRead`,
  },
})

export const customReadSuccess = (resource, single, request, thunk) => ({
  type: CUSTOM_READ_SUCCESS,
  payload: single,
  meta: {
    request,
    thunk,
    resource,
  },
})

export const customReadFailure = (resource, error, request, thunk) => ({
  type: CUSTOM_READ_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource,
  },
})

export const CUSTOM_UPDATE_REQUEST = 'CUSTOM_UPDATE_REQUEST'
export const CUSTOM_UPDATE_SUCCESS = 'CUSTOM_UPDATE_SUCCESS'
export const CUSTOM_UPDATE_FAILURE = 'CUSTOM_UPDATE_FAILURE'

export const customUpdateRequest = (resource, data) => ({
  type: CUSTOM_UPDATE_REQUEST,
  payload: { data },
  meta: {
    resource,
    thunk: `${resource}Update`,
  },
})

export const customUpdateSuccess = (resource, detail, request, thunk) => ({
  type: CUSTOM_UPDATE_SUCCESS,
  payload: detail,
  meta: {
    request,
    thunk,
    resource,
  },
})

export const customUpdateFailure = (resource, error, request, thunk) => ({
  type: CUSTOM_UPDATE_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource,
  },
})

export const CUSTOM_FILE_UPLOAD_REQUEST = 'CUSTOM_FILE_UPLOAD_REQUEST'
export const CUSTOM_FILE_UPLOAD_SUCCESS = 'CUSTOM_FILE_UPLOAD_SUCCESS'
export const CUSTOM_FILE_UPLOAD_FAILURE = 'CUSTOM_FILE_UPLOAD_FAILURE'

export const customFileUploadRequest = (resource, file) => ({
  type: CUSTOM_FILE_UPLOAD_REQUEST,
  payload: file,
  meta: {
    resource,
    thunk: `${resource}FileUpload`,
  },
})

export const customFileUploadSuccess = (resource, response, request, thunk) => ({
  type: CUSTOM_FILE_UPLOAD_SUCCESS,
  payload: response,
  meta: {
    request,
    thunk,
    resource,
  },
})

export const customFileUploadFailure = (resource, error, request, thunk) => ({
  type: CUSTOM_FILE_UPLOAD_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource,
  },
})
