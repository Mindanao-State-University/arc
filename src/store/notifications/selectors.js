export const initialState = []


export const get = (state = initialState, originalId) => (state || initialState).find(({ id }) => id === originalId)
export const getList = (state = initialState) => state || initialState
export const isOpen = (state = initialState, name) => !!state[name]
