import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
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

export default ({ onCancel, refetch }) => (
  <Mutation mutation={VALIDATE_CODE}>
    {(validateCode, { error, loading }) => {
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
                refetch();
                setSubmitting(loading);
                onCancel();
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
                  />
                  <Grid container justify="space-around">
                    <Button
                      onClick={() => onCancel()}
                      variant="contained"
                      color="default"
                    >
                      {Meteor.settings.public.forms.commons.CANCEL_BTN_LBL}
                    </Button>
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
