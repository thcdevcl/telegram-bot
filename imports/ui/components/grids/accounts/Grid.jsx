import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Button, Grid, Typography } from "@material-ui/core";

import Spinner from "../../utils/Spinner";
import Account from "./Item";
import AddTelegramAccount from "../../forms/accounts/AddTelegramForm";

function Accounts({ accounts, refetch }) {
  const [state, setState] = useState({ form: accounts.length == 0 });
  const { form } = state;
  const toggleForm = () => setState(prev => ({ ...prev, form: !form }));
  return (
    <Grid container>
      <Grid
        container
        justify="space-between"
        style={{ paddingRight: 8, marginBottom: 8 }}
      >
        <Typography variant="h6" gutterBottom>
          Telegram Accounts
        </Typography>
        {!form && (
          <Button
            variant="contained"
            color="secondary"
            onClick={event => toggleForm()}
          >
            Add
          </Button>
        )}
      </Grid>
      {form ? (
        <AddTelegramAccount
          onCancel={toggleForm}
          toggable={accounts.length > 0}
          refetch={refetch}
        />
      ) : (
        accounts.map(account => (
          <Account key={account._id} account={account} refetch={refetch} />
        ))
      )}
    </Grid>
  );
}

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
  <Query query={ACCOUNTS} fetchPolicy="network-only">
    {({ loading, error, data, refetch }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      const { accounts } = data.currentUser;
      return (
        <Accounts
          accounts={accounts}
          refetch={() => {
            refetch();
          }}
        />
      );
    }}
  </Query>
);
