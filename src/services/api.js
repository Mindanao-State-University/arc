import 'whatwg-fetch'
import { stringify } from 'qs'
import merge from 'lodash/merge'
import FileSaver from 'file-saver'
import { apiUrl } from 'config'


export const getFileNameByContentDisposition = (contentDisposition) => {
  const regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/
  const matches = regex.exec(contentDisposition)
  let filename = 'download'

  if (matches != null && matches[3]) {
    filename = matches[3].replace(/['"]/g, '')
  }

  return decodeURI(filename)
}

export const checkStatus = (response) => {
  if (response.ok) {
    return response
  }
  const error = new Error(`${response.status} ${response.statusText}`)

  return response.json()
    .then((response) => {
      error.response = response
      throw error
    })
}

export function parseJSON(response) {
  if (response.headers && response.headers.get('Content-Type') === 'application/octet-stream') {
    const filename = getFileNameByContentDisposition(response.headers.get('Content-Disposition'))

    return response.blob()
      .then(blob => FileSaver.saveAs(blob, filename))
      .then(() => ({ filename }))
  }

  if (response.headers && response.headers.has('X-Total-Count')) {
    return response.json()
      .then(list => ([
        { 'X-Total-Count': parseInt(response.headers.get('X-Total-Count'), 10) },
        ...list,
      ]))
  }

  return response.json()
}

export const parseSettings = ({
  method = 'get', data, locale, ...otherSettings
} = {}) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  }

  if (data instanceof FormData) {
    headers = {
      Credentials: 'same-origin',
    }
  }

  let body
  if (data instanceof FormData) {
    body = data
  } else if (data) body = JSON.stringify(data)

  const settings = merge({
    body,
    method,
    headers,
  }, otherSettings)

  return settings
}

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint
  const querystring = params ? `?${stringify(params, { arrayFormat: 'repeat' })}` : ''
  return `${url}${querystring}`
}

const api = {}

api.request = (endpoint, { params, ...settings } = {}) => fetch(parseEndpoint(endpoint, params), parseSettings(settings))
  .then(checkStatus)
  .then(parseJSON)

;['delete', 'get'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings })
})

;['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings })
})

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    }
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    }
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings))
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings })
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'get', ...settings })
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings })
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings })
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings })
  },
})

export default api
