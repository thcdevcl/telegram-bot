import React from "react";

import { Grid } from "@material-ui/core";

import Page from "../layouts/PageLayout";
import Groups from "../components/cards/GroupsCard";

export default () => (
  <Page headline={Meteor.settings.public.router.index.home.TITLE}>
    <Grid
      container
      justify="center"
      style={{ width: "100%", padding: "0px 16px" }}
    >
      <Groups />
    </Grid>
  </Page>
);
