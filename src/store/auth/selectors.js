export const initialState = {
  user: null,
}

export const getUser = (state = initialState) => state.user || initialState.user
export const getPermissions = (state = initialState) => state.user.role.permissions
