import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import * as Yup from "yup";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import Notify from "../../../../modules/notification";

import Spinner from "../../utils/Spinner";

const ENQUEUE_MESSAGE = gql`
  mutation enqueueMessage($dispatch: DispatchInput!) {
    enqueueMessage(dispatch: $dispatch) {
      enqueued
    }
  }
`;

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Required field")
});

export default ({ ids, onCancel, account }) => (
  <Mutation mutation={ENQUEUE_MESSAGE}>
    {(enqueueMessage, { error, loading }) => {
      return (
        <Formik
          initialValues={{ message: "" }}
          validationSchema={validationSchema}
          onSubmit={({ message }, { setSubmitting }) => {
            setSubmitting(loading);
            enqueueMessage({
              variables: { dispatch: { ids, message, account } }
            })
              .then(() => {
                setSubmitting(loading);
                Notify({
                  message: `Message enqueued!`
                });
                onCancel();
              })
              .catch(error => {
                setSubmitting(false);
                Notify({ error });
              });
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => {
            const { message } = values;
            if (isSubmitting) return <Spinner />;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container justify="center">
                  <TextField
                    id="message"
                    margin="dense"
                    variant="outlined"
                    values={message}
                    onChange={handleChange}
                    autoFocus
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Message"
                    required
                  />
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={event => {
                      onCancel();
                    }}
                    style={{ marginRight: 8 }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="secondary">
                    Send
                  </Button>
                </Grid>
              </form>
            );
          }}
        </Formik>
      );
    }}
  </Mutation>
);
