import React from "react";

import { Grid } from "@material-ui/core";

import Signin from "../components/forms/accounts/SigninForm";

export default () => (
  <Grid container justify="center" style={{ padding: 16 }}>
    <Grid item xs={9} sm={6}>
      <Signin />
    </Grid>
  </Grid>
);
