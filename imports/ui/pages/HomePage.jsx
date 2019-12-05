import React from "react";
import { Redirect } from "react-router-dom";

import { Grid } from "@material-ui/core";

import { GlobalContextConsumer } from "../../startup/client/App";

import Page from "../layouts/PageLayout";
import TelethonAPI from "../components/cards/TelethonAPICard";

export default () => (
  <Page headline={Meteor.settings.public.router.index.home.TITLE}>
    <Grid container spacing={2} style={{ width: "100%", paddingLeft: 16 }}>
      <GlobalContextConsumer>
        {({ telethonapi }) => {
          if (telethonapi.connected && telethonapi.authorized)
            return <Redirect to={Meteor.settings.public.router.groups.PATH} />;
          return <TelethonAPI />;
        }}
      </GlobalContextConsumer>
    </Grid>
  </Page>
);
