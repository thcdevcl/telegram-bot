import merge from "lodash/merge";
import { ApolloServer } from "apollo-server-express";
import { getUser } from "meteor/apollo";
import { WebApp } from "meteor/webapp";

import TelegramBotAPI from "../../../api/data-sources/telegram-bot-api";
import TelethonAPI from "../../../api/data-sources/telethonapi";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import "../../../api/dispatch-queue";

const typeDefs = [UserSchema];

const resolvers = merge(UserResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  }),
  dataSources: () => ({
    TelethonAPI: new TelethonAPI(),
    TelegramBotAPI: new TelegramBotAPI()
  })
});

server.applyMiddleware({ app: WebApp.connectHandlers, path: "/graphql" });

WebApp.connectHandlers.use("/graphql", (req, res) => {
  if (req.method === "GET") {
    res.end();
  }
});
