import React from "react";

import { Divider, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rootContainer: { flex: 1, overflow: "scroll" },
  divider: { marginBottom: theme.spacing(3) }
});

export default withStyles(styles)(({ classes, headline, header, children }) => (
  <Grid
    container
    alignContent="flex-start"
    direction="column"
    wrap="nowrap"
    classes={{ container: classes.rootContainer }}
  >
    <Grid container>
      <Grid item xs={12}>
        {header ? (
          header
        ) : (
          <Typography variant="h4" color="primary" gutterBottom>
            {headline}
          </Typography>
        )}
        <Divider classes={{ root: classes.divider }} />
      </Grid>
    </Grid>
    {children}
  </Grid>
));
