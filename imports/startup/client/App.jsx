import React, { createContext } from "react";
import ReactNotification from "react-notifications-component";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MeteorAccountsLink } from "meteor/apollo";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { HelmetProvider } from "react-helmet-async";

import "react-notifications-component/dist/theme.css";

import theme from "../../assets/theme";

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
  <>
    <ReactNotification />
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <HelmetProvider>
          <Router />
        </HelmetProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  </>
);
