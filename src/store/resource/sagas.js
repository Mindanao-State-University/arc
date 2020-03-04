
import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'

export function* createResource(api, { data }, { resource, thunk }) {
  try {
    const detail = yield call([api, api.post], `/${resource}`, data)

    yield put(actions.resourceCreateSuccess(resource, detail, { data }, thunk))
  } catch (e) {
    yield put(actions.resourceCreateFailure(resource, e, { data }, thunk))
  }
}

export function* readResourceList(api, { params }, { resource, thunk }) {
  try {
    const list = yield call([api, api.get], `/${resource}`, { params })
    let count = list.length
    if (list.length > 0 && typeof list[0] === 'object' && Object.prototype.hasOwnProperty.call(list[0], 'X-Total-Count')) {
      const item = list.shift()
      count = item['X-Total-Count']
    }

    yield put(actions.resourceListReadSuccess(resource, list, { params }, thunk, count))
  } catch (e) {
    yield put(actions.resourceListReadFailure(resource, e, { params }, thunk))
  }
}

export function* readResourceDetail(api, { needle }, { resource, thunk }) {
  try {
    const detail = yield call([api, api.get], `/${resource}/${needle}`)
    yield put(actions.resourceDetailReadSuccess(resource, detail, { needle }, thunk))
  } catch (e) {
    yield put(actions.resourceDetailReadFailure(resource, e, { needle }, thunk))
  }
}

export function* updateResource(api, { needle, data }, { resource, thunk }) {
  try {
    const detail = yield call([api, api.put], `/${resource}/${needle}`, data)
    yield put(actions.resourceUpdateSuccess(resource, detail, { needle, data }, thunk))
  } catch (e) {
    yield put(actions.resourceUpdateFailure(resource, e, { needle, data }, thunk))
  }
}

export function* deleteResource(api, { needle }, { resource, thunk }) {
  try {
    yield call([api, api.delete], `/${resource}/${needle}`)
    yield put(actions.resourceDeleteSuccess(resource, { needle }, thunk))
  } catch (e) {
    yield put(actions.resourceDeleteFailure(resource, e, { needle }, thunk))
  }
}

export function* exportResourceList(api, { params }, { resource, thunk }) {
  try {
    const response = yield call([api, api.get], `/${resource}/export`, { params })
    yield put(actions.resourceListExportSuccess(resource, response, { params }, thunk))
  } catch (e) {
    yield put(actions.resourceListExportFailure(resource, e, { params }, thunk))
  }
}

export function* watchResourceCreateRequest(api, { payload, meta }) {
  yield call(createResource, api, payload, meta)
}

export function* watchResourceListReadRequest(api, { payload, meta }) {
  yield call(readResourceList, api, payload, meta)
}

export function* watchResourceDetailReadRequest(api, { payload, meta }) {
  yield call(readResourceDetail, api, payload, meta)
}

export function* watchResourceUpdateRequest(api, { payload, meta }) {
  yield call(updateResource, api, payload, meta)
}

export function* watchResourceDeleteRequest(api, { payload, meta }) {
  yield call(deleteResource, api, payload, meta)
}

export function* watchResourceExportRequest(api, { payload, meta }) {
  yield call(exportResourceList, api, payload, meta)
}

export default function* ({ api }) {
  yield takeEvery(actions.RESOURCE_CREATE_REQUEST, watchResourceCreateRequest, api)
  yield takeEvery(actions.RESOURCE_LIST_READ_REQUEST, watchResourceListReadRequest, api)
  yield takeEvery(actions.RESOURCE_DETAIL_READ_REQUEST, watchResourceDetailReadRequest, api)
  yield takeEvery(actions.RESOURCE_UPDATE_REQUEST, watchResourceUpdateRequest, api)
  yield takeEvery(actions.RESOURCE_DELETE_REQUEST, watchResourceDeleteRequest, api)
  yield takeEvery(actions.RESOURCE_LIST_EXPORT_REQUEST, watchResourceExportRequest, api)
}
