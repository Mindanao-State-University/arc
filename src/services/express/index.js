import express from 'express'
import forceSSL from 'express-force-ssl'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import csrf from 'csurf'
import path from 'path'
import { env, ip, port } from 'config'

const root = path.join(__dirname, '../../..')

export default (routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: true,
      trustXFPHeader: true
    })
    app.use(forceSSL)
  }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(compression())
    app.use(morgan('dev'))
    app.use(cookieParser())
    app.use(csrf({ cookie: true }))
    app.use(express.static(path.join(root, 'dist')))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(routes)

  app.listen(port, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info(`Listening on http://${ip}:${port}`)
    }
  })

  return app
}