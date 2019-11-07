import merge from "lodash/merge";
import { ApolloServer } from "apollo-server-express";
import { getUser } from "meteor/apollo";
import { WebApp } from "meteor/webapp";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

const typeDefs = [UserSchema];

const resolvers = merge(UserResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({ app: WebApp.connectHandlers, path: "/graphql" });

WebApp.connectHandlers.use("/graphql", (req, res) => {
  if (req.method === "GET") {
    res.end();
  }
});
