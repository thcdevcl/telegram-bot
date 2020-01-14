import React, { useState } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import Account from "./Item";
import AddTelegramAccount from "../../forms/accounts/AddTelegramForm";

export default ({ accounts }) => {
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
        />
      ) : (
        accounts.map(account => <Account key={account._id} account={account} />)
      )}
    </Grid>
  );
};
