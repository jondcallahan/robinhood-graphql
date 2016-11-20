import express from 'express'
import compression from 'compression'
import cors from 'cors'
import graphQLHTTP from 'express-graphql'

import schema from './schema'

const app = express()
app.options('*', cors())

app.use(compression())
app.use(cors())
app.use(graphQLHTTP({
  schema,
  graphiql: true,
}))

app.listen(8080)
