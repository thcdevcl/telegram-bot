import React from "react";

import { Button, Grid } from "@material-ui/core";

export default ({ onCancel }) => (
  <Grid container>
    <form>
      <Button color="default" variant="contained" onClick={() => onCancel()}>
        Cancel
      </Button>
    </form>
  </Grid>
);
