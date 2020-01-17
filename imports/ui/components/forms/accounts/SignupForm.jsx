import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { withApollo } from "react-apollo";
import * as Yup from "yup";

import Notify from "../../../../modules/notification";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import Spinner from "../../utils/Spinner";

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Required field"),
  password: Yup.string()
    .min(6)
    .required("Required field")
});

function Form({ client }) {
  let history = useHistory();
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={signupSchema}
      onSubmit={({ email, password }, { setSubmitting }) => {
        Accounts.createUser(
          {
            email,
            password,
            profile: { role: "limited", plan: "solo" }
          },
          error => {
            if (!error) {
              client.resetStore();
              history.push(Meteor.settings.public.router.index.PATH);
              Notify({
                title: "Success!",
                message: "Account Created",
                type: "success"
              });
            } else {
              Notify({ error });
              setSubmitting(false);
            }
          }
        );
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container justify="center" style={{ marginTop: 64 }}>
              <Grid item xs={12}>
                <Typography variant="h4" paragraph>
                  {Meteor.settings.public.forms.accounts.signup.HEADLINE}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {Meteor.settings.public.forms.accounts.signup.fields.TEXT.map(
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
                {Meteor.settings.public.forms.commons.SUBMIT_BTN_LBL}
              </Button>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default withApollo(Form);
