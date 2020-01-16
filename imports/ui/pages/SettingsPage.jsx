import React from "react";

import { Grid } from "@material-ui/core";

import Page from "../layouts/PageLayout";

export default () => (
  <Page headline={Meteor.settings.public.router.settings.TITLE}>
    <p>Settings</p>
  </Page>
);
