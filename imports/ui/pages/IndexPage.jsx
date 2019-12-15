import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import Signin from "../components/forms/accounts/SigninForm";
import Signup from "../components/forms/accounts/SignupForm";

export default () => {
  const [state, setState] = useState({ signup: false });
  const { signup } = state;
  const toggleForm = () => setState({ signup: !signup });
  return (
    <Grid container justify="center" style={{ padding: 16 }}>
      <Grid item xs={9} sm={6}>
        {signup ? <Signup /> : <Signin />}
        {!signup && (
          <Grid container justify="center" style={{ marginTop: 16 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => toggleForm()}
            >
              Sign Up
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
