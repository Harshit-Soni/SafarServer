import express, { urlencoded } from "express";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import cors from "cors";
import { createServer } from "https";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { userResolvers } from "./schema/resolvers/userResolver";
import { userTypeDef } from "./schema/typedefs/userTypedef";

const router = express.Router();

export async function startAppoloServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userTypeDef, ...scalarTypeDefs],
    resolvers: [userResolvers, scalarResolvers],
    // playgroud:true
  });
  const app = express();
  const httpServer = createServer(app);
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });
  app.use(express.json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());
  app.use(router);
  app.listen(4000, () => {
    console.log("server listening ");
  });
}
startAppoloServer();
