import {
  Home,
} from 'components'

import { createRoute } from 'services/helper'

const routes = [
  createRoute('/', true, Home),
]


export default routes