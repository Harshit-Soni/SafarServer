import express, { urlencoded } from 'express'

import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import Config from './config/Config'
import cors from 'cors'
import { createServer } from 'https'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers as scalarResolvers } from 'graphql-scalars'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import { userResolvers } from './schema/resolvers/userResolver/userResolver'
import { userTypeDef } from './schema/typedefs/userTypedef'
import { verifyToken } from './authentication/Auth'

const router = express.Router()

export async function startAppoloServer() {
  const port = Config.port

  const schema = makeExecutableSchema({
    typeDefs: [userTypeDef, ...scalarTypeDefs],
    resolvers: [userResolvers, scalarResolvers],
  })

  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.get('Authorization') || ''
      return { user: verifyToken(token.replace('Bearer ', '')) }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    debug: false,
  })
  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
  })

  app.use(express.json())
  app.use(urlencoded({ extended: false }))
  app.use(cors())
  app.use(router)

  app.listen(port, () => {
    console.log('server listening ')
  })
}
startAppoloServer()
