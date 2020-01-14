import React from "react";

import Page from "../layouts/PageLayout";

import AccountsGrid from "../components/grids/accounts/Grid.jsx";

export default () => (
  <Page headline={Meteor.settings.public.router.index.home.TITLE}>
    <AccountsGrid />
  </Page>
);
