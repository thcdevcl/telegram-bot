import React from "react";

import { Card, Grid, Typography } from "@material-ui/core";

export default () => (
  <Grid item xs={12} md={4}>
    <Grid
      container
      component={Card}
      elevation={2}
      style={{ padding: 8 }}
      direction="column"
    >
      <Typography variant="h5" gutterBottom>
        {Meteor.settings.public.dashboard.telethon_api.HEADLINE}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {Meteor.settings.public.dashboard.telethon_api.SUBTITLE}
      </Typography>
    </Grid>
  </Grid>
);
