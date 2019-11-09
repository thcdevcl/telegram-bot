import React from "react";
import { Formik } from "formik";
import { withApollo } from "react-apollo";
import * as Yup from "yup";

import Notify from "../../../../modules/notification";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import Spinner from "../../utils/Spinner";

const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Required field"),
  password: Yup.string()
    .min(6)
    .required("Required field")
});

function Form({ client }) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={signinSchema}
      onSubmit={({ email, password }, { setSubmitting }) => {
        Meteor.loginWithPassword(email, password, error => {
          if (!error) {
            1;
            client.resetStore();
          } else {
            setSubmitting(false);
            Notify({ error });
          }
        });
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container justify="center" style={{ marginTop: 64 }}>
              <Grid item xs={12}>
                <Typography variant="h4" paragraph>
                  {Meteor.settings.public.forms.accounts.signin.HEADLINE}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {Meteor.settings.public.forms.accounts.signin.fields.TEXT.map(
                  field => (
                    <TextField
                      key={field.id}
                      onChange={handleChange}
                      value={values[name]}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      required
                      {...field}
                    />
                  )
                )}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                style={{ marginTop: 24 }}
              >
                {Meteor.settings.public.forms.accounts.signin.SUBMIT_BTN_LBL}
              </Button>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default withApollo(Form);
