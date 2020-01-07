import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Grid, TextField } from "@material-ui/core";

import Notify from "../../../../modules/notification";

import Spinner from "../../utils/Spinner";

const VALIDATE_CODE = gql`
  mutation validateCode($code: Int!) {
    validateCode(code: $code) {
      connected
    }
  }
`;

const formSchema = Yup.object().shape({
  code: Yup.number().required("Required field")
});

export default () => (
  <Mutation mutation={VALIDATE_CODE}>
    {(validateCode, { error, loading }) => {
      const history = useHistory();
      return (
        <Formik
          initialValues={{ code: "" }}
          formSchema={formSchema}
          onSubmit={({ code }, { setSubmitting }) => {
            setSubmitting(true);
            validateCode({ variables: { code } })
              .then(() => {
                Notify({
                  message:
                    Meteor.settings.public.forms.telethon.validate_code
                      .notifications.messages.CODE_OK
                });
                history.push("/");
                setSubmitting(loading);
              })
              .catch(error => Notify({ error }));
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => {
            const { code } = values;
            if (loading) return <Spinner />;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" alignItems="center">
                  <TextField
                    value={code}
                    onChange={handleChange}
                    id="code"
                    placeholder="Code"
                    type="number"
                    margin="dense"
                    required
                    fullWidth
                  />
                  <Grid container justify="center">
                    <Button variant="contained" color="secondary" type="submit">
                      {Meteor.settings.public.forms.commons.SUBMIT_BTN_LBL}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      );
    }}
  </Mutation>
);
