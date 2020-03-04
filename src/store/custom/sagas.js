
import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'

export function* readCustom(api, { params }, { resource, thunk }) {
  try {
    const response = yield call([api, api.get], `/${resource}`, { params })
    yield put(actions.customReadSuccess(resource, response, { params }, thunk))
  } catch (e) {
    yield put(actions.customReadFailure(resource, e, { params }, thunk))
  }
}

export function* updateCustom(api, { data }, { resource, thunk }) {
  try {
    const detail = yield call([api, api.put], `/${resource}`, data)
    yield put(actions.customUpdateSuccess(resource, detail, { data }, thunk))
  } catch (e) {
    yield put(actions.customUpdateFailure(resource, e, { data }, thunk))
  }
}

export function* fileUploadCustom(api, data, { resource, thunk }) {
  try {
    const formData = new FormData()
    formData.append('file', data, data.name)

    const response = yield call([api, api.post], `/${resource}`, formData)
    yield put(actions.customFileUploadSuccess(resource, response, { data }, thunk))
  } catch (e) {
    yield put(actions.customFileUploadFailure(resource, e, { data }, thunk))
  }
}

export function* watchCustomReadRequest(api, { payload, meta }) {
  yield call(readCustom, api, payload, meta)
}

export function* watchCustomUpdateRequest(api, { payload, meta }) {
  yield call(updateCustom, api, payload, meta)
}

export function* watchCustomFileUploadRequest(api, { payload, meta }) {
  yield call(fileUploadCustom, api, payload, meta)
}

export default function* ({ api }) {
  yield takeEvery(actions.CUSTOM_READ_REQUEST, watchCustomReadRequest, api)
  yield takeEvery(actions.CUSTOM_UPDATE_REQUEST, watchCustomUpdateRequest, api)
  yield takeEvery(actions.CUSTOM_FILE_UPLOAD_REQUEST, watchCustomFileUploadRequest, api)
}
