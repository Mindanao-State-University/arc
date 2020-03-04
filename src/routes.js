import {
  Home,
  Detail,
} from 'components'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/detail',
    exact: true,
    component: Detail,
  }
]
export default routes
