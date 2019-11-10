import React from "react";

import { Grid } from "@material-ui/core";

import Page from "../layouts/PageLayout";
import TelethonAPI from "../components/cards/TelethonAPI";

export default () => (
  <Page headline={Meteor.settings.public.router.index.home.TITLE}>
    <Grid container>
      <TelethonAPI />
    </Grid>
  </Page>
);
