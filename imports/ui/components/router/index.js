import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

import { GlobalContextProvider } from "../../../startup/client/App";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Groups from "../../pages/GroupsPage";
import Home from "../../pages/HomePage";
import Index from "../../pages/IndexPage";
import NotFound from "../../pages/NotFoundPage";

import Spinner from "../utils/Spinner";
import ScrollTop from "../utils/ScrollTop";

function Router({ loading, currentUser }) {
  if (loading) return <Spinner />;
  return (
    <BrowserRouter>
      <GlobalContextProvider value={{ currentUser }}>
        <ScrollTop>
          <Switch>
            {currentUser ? (
              <PrivateRoute
                exact
                component={Home}
                path={Meteor.settings.public.router.index.PATH}
                title={Meteor.settings.public.router.index.home.TITLE}
                content={Meteor.settings.public.router.index.home.CONTENT}
                name={Meteor.settings.public.router.index.home.NAME}
              />
            ) : (
              <PublicRoute
                exact
                component={Index}
                path={Meteor.settings.public.router.index.PATH}
                title={Meteor.settings.public.router.index.TITLE}
                content={Meteor.settings.public.router.index.CONTENT}
                name={Meteor.settings.public.router.index.NAME}
              />
            )}
            <PrivateRoute
              exact
              component={Groups}
              path={Meteor.settings.public.router.groups.PATH}
              title={Meteor.settings.public.router.groups.TITLE}
              content={Meteor.settings.public.router.groups.CONTENT}
              name={Meteor.settings.public.router.groups.NAME}
            />
            <Route component={NotFound} />
          </Switch>
        </ScrollTop>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(Router);
