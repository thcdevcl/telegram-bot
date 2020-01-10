import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import Notify from "../../../../modules/notification";

import Spinner from "../../utils/Spinner";

const SEND_BULK_MESSAGE = gql`
  mutation sendBulkMessage($bulk: BulkMessageInput!) {
    sendBulkMessage(bulk: $bulk) {
      sent
    }
  }
`;

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Required field")
});

export default ({ ids, onCancel, to }) => {
  const history = useHistory();
  return (
    <Mutation mutation={SEND_BULK_MESSAGE}>
      {(sendBulkMessage, { error, loading }) => {
        return (
          <Formik
            initialValues={{ message: "" }}
            validationSchema={validationSchema}
            onSubmit={({ message }, { setSubmitting }) => {
              setSubmitting(loading);
              sendBulkMessage({ variables: { bulk: { ids, message } } })
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
                    <Typography
                      variant="subtitle1"
                      color="primary"
                    >{`Whisper members of: ${to}`}</Typography>
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
};
