export const initialState = {}

export const initialResourceState = undefined

export const get = (state = initialState, resource) => state[resource] || initialResourceState
