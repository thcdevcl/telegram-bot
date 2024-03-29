import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

import { GlobalContextProvider } from "../../../startup/client/App";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Account from "../../pages/AccountPage";
import Dashboard from "../../pages/DashboardPage";
import Index from "../../pages/IndexPage";
import Settings from "../../pages/SettingsPage";
import NotFound from "../../pages/NotFoundPage";
import Spinner from "../utils/Spinner";
import ScrollTop from "../utils/ScrollTop";

function Router({ loading, currentUser, checkClient }) {
  if (loading) return <Spinner />;
  return (
    <BrowserRouter>
      <GlobalContextProvider
        value={{ currentUser, telethonapi: { ...checkClient } }}
      >
        <ScrollTop>
          <Switch>
            {currentUser ? (
              <PrivateRoute
                exact
                component={Dashboard}
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
              component={Account}
              path={`${Meteor.settings.public.router.accounts.PATH}/:_id`}
              title={Meteor.settings.public.router.accounts.TITLE}
              content={Meteor.settings.public.router.accounts.CONTENT}
              name={Meteor.settings.public.router.accounts.NAME}
            />
            <PrivateRoute
              exact
              component={Settings}
              path={Meteor.settings.public.router.settings.PATH}
              title={Meteor.settings.public.router.settings.TITLE}
              content={Meteor.settings.public.router.settings.CONTENT}
              name={Meteor.settings.public.router.settings.NAME}
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
      profile {
        role
      }
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "network-only"
  },
  props: ({ data }) => ({ ...data })
})(Router);
