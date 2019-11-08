import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";

export default () => (
  <Grid container justify="center" style={{ padding: 16 }}>
    <Button
      variant="contained"
      size="large"
      color="secondary"
      component={Link}
      to={Meteor.settings.public.router.sign_in.PATH}
    >
      {Meteor.settings.public.router.sign_in.TITLE}
    </Button>
  </Grid>
);
