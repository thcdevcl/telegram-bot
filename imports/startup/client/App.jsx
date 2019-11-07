import React, { createContext } from "react";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MeteorAccountsLink } from "meteor/apollo";

const GlobalContext = createContext();

export const GlobalContextProvider = GlobalContext.Provider;
export const GlobalContextConsumer = GlobalContext.Consumer;

import Router from "../../ui/components/router";

const client = new ApolloClient({
  link: ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: "/graphql"
    })
  ]),
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);
