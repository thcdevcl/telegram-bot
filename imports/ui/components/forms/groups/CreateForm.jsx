import React from "react";
import { Formik } from "formik";

import { Button, Grid, TextField } from "@material-ui/core";

import Spinner from "../../utils/Spinner";

export default ({ onCancel }) => (
  <Formik
    initialValues={{ name: "" }}
    onSubmit={({ name }, { setSubmitting }) => {
      setSubmitting(true);
    }}
  >
    {({ values, handleChange, handleSubmit, isSubmitting }) => {
      if (isSubmitting) return <Spinner />;
      const { name } = values;
      return (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <TextField
              id="name"
              margin="dense"
              variant="outlined"
              values={name}
              onChange={handleChange}
              fullWidth
              placeholder="Name"
              required
            />
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Button
                  color="default"
                  variant="contained"
                  onClick={() => onCancel()}
                  style={{ marginRight: 8 }}
                >
                  {Meteor.settings.public.forms.commons.CANCEL_BTN_LBL}
                </Button>
                <Button color="secondary" variant="contained" type="submit">
                  {Meteor.settings.public.forms.commons.SUBMIT_BTN_LBL}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      );
    }}
  </Formik>
);
