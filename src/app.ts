import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express, { urlencoded } from "express";
import { createServer } from "https";
import cors from "cors";
import { userTypeDef } from "./schema/typedefs/userTypedef";
import { userResolvers } from "./schema/resolvers/userResolver";
import { client } from "./db";
const router = express.Router();

export async function startAppoloServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userTypeDef],
    resolvers: [userResolvers],
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
  // app.get("/", (a, b) => {
  //   client.connect((obj) => {
  //     console.log(obj);
  //   });
  //   // const res = client.query("Select * from Persons");
  //   // console.log(res);

  //   b.send("hellps");
  // });
  app.listen(4000, () => {
    console.log("server listening ");
  });
}
startAppoloServer();
