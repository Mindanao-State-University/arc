import {
  Home,
  Detail,
} from 'components'

import { 
  basename
} from 'config'


const createRoute = (path, exact, component) => {
  return {
    path: `${basename}/${path}`,
    exact,
    component
  } 
}

const routes = [
  createRoute('', true, Home),
  createRoute('details', true, Detail),
]


export default routes
