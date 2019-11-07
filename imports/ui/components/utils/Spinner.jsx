import React from "react";
import { PropTypes } from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    margin: "auto",
    height: "100%"
  }
});

export default withStyles(styles)(({ classes, color, size }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    classes={{ container: classes.container }}
  >
    <CircularProgress
      size={size ? size : 75}
      color={color ? color : "secondary"}
      variant="indeterminate"
    />
  </Grid>
));
