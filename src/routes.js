import {
  Home,
  Detail,
} from 'components'

import { createRoute } from 'services/helper'

 const routes = [
  createRoute('', true, Home),
  createRoute('details', true, Detail),
]


export default routes