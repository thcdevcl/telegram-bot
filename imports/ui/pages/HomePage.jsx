import React from "react";

import { Grid } from "@material-ui/core";

import Page from "../layouts/PageLayout";
import Groups from "../components/cards/GroupsCard";
import TelethonAPI from "../components/cards/TelethonAPICard";

export default () => (
  <Page headline={Meteor.settings.public.router.index.home.TITLE}>
    <Grid container spacing={2} style={{ width: "100%", paddingLeft: 16 }}>
      <TelethonAPI />
      <Groups />
    </Grid>
  </Page>
);
