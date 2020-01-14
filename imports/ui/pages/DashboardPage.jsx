import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Spinner from "../components/utils/Spinner";
import Page from "../layouts/PageLayout";

import AccountsGrid from "../components/grids/accounts/Grid.jsx";

const ACCOUNTS = gql`
  query {
    currentUser {
      _id
      accounts {
        _id
        name
        api_id
        api_hash
        phone
        session_string
        telethon {
          authorized
          connected
        }
      }
    }
  }
`;

export default () => (
  <Query query={ACCOUNTS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      console.log(data);
      return (
        <Page headline={Meteor.settings.public.router.index.home.TITLE}>
          <AccountsGrid accounts={data.currentUser.accounts} />
        </Page>
      );
    }}
  </Query>
);
