import React from "react";

import { Grid } from "@material-ui/core";

import Page from "../layouts/PageLayout";
import TelethonAPI from "../components/cards/TelethonAPICard";

export default () => (
  <Page headline={Meteor.settings.public.router.settings.TITLE}>
    <Grid container style={{ width: "100%", paddingLeft: 16 }}>
      <TelethonAPI />
    </Grid>
  </Page>
);
