import { basename } from 'config'

export const createRoute = (path, exact, component) => {
  return {
    path: `${basename}/${path}`,
    exact,
    component
  } 
}

