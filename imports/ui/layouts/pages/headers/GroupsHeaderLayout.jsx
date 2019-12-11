import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography
} from "@material-ui/core";

import AddGroup from "../../../components/forms/groups/CreateForm";

export default () => {
  const [state, setState] = useState({ dialog: false });
  const { dialog } = state;

  const toggleDialog = () =>
    setState(prevState => ({ ...prevState, dialog: !dialog }));
  return (
    <Grid container justify="space-between" alignItems="center">
      <Typography variant="h4" color="primary" gutterBottom>
        {Meteor.settings.public.pages.groups.HEADLINE}
      </Typography>
      {!dialog && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleDialog()}
          style={{ marginRight: 8 }}
        >
          Add
        </Button>
      )}
      <Dialog
        aria-labelledby="add-custom-group-dialog"
        open={dialog}
        onClose={toggleDialog}
        maxWidth="sm"
        fullWidth
        disableBackdropClick
      >
        <DialogTitle id="add-custom-group-dialog">Add Group</DialogTitle>
        <DialogContent>
          <AddGroup onCancel={toggleDialog} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
