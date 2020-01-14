import React from "react";
import gql from "graphql-tag";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Grid, TextField, Typography } from "@material-ui/core";

import Notify from "../../../../modules/notification";
import Spinner from "../../utils/Spinner";

const CREATE_TELEGRAM_ACCOUNT = gql`
  mutation createTelegramAccount($account: TelegramAccountInput!) {
    createTelegramAccount(account: $account) {
      _id
    }
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  api_hash: Yup.string().required("Required field"),
  api_id: Yup.string().required("Required field"),
  phone: Yup.string().required("Required field")
});

export default ({ toggable, onCancel, refetch }) => (
  <Mutation mutation={CREATE_TELEGRAM_ACCOUNT} refetchQueries={["currentUser"]}>
    {(createTelegramAccount, { error, loading }) => {
      if (loading) return <Spinner />;
      if (error) return `error: ${error}`;
      return (
        <Formik
          initialValues={{ name: "", api_hash: "", api_id: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={({ api_hash, api_id, phone, name }, { setSubmitting }) => {
            createTelegramAccount({
              variables: { account: { api_hash, api_id, phone, name } }
            })
              .then(() => {
                Notify({
                  message: `Account created!`
                });
                refetch();
                onCancel();
              })
              .catch(error => {
                setSubmitting(false);
                Notify({ error });
              });
          }}
        >
          {({ values, handleChange, handleSubmit }) => {
            const { api_hash, api_id, phone, name } = values;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container justify="center" style={{ marginBottom: 16 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" align="center">
                      Add Account
                    </Typography>
                    <TextField
                      variant="outlined"
                      id="name"
                      margin="dense"
                      value={name}
                      onChange={handleChange}
                      placeholder="Account Name"
                      fullWidth
                      required
                    />
                    <TextField
                      variant="outlined"
                      id="api_id"
                      margin="dense"
                      value={api_id}
                      onChange={handleChange}
                      placeholder="API ID"
                      fullWidth
                      required
                    />
                    <TextField
                      variant="outlined"
                      id="api_hash"
                      margin="dense"
                      value={api_hash}
                      onChange={handleChange}
                      placeholder="API HASH"
                      fullWidth
                      required
                    />
                    <TextField
                      variant="outlined"
                      id="phone"
                      margin="dense"
                      value={phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      fullWidth
                      required
                    />
                    <Grid item xs={12} style={{ marginTop: 8 }}>
                      <Grid container justify="flex-end">
                        {toggable && (
                          <Button
                            color="default"
                            variant="contained"
                            onClick={onCancel}
                            style={{ marginRight: 8 }}
                          >
                            {
                              Meteor.settings.public.forms.commons
                                .CANCEL_BTN_LBL
                            }
                          </Button>
                        )}
                        <Button
                          color="secondary"
                          variant="contained"
                          type="submit"
                        >
                          {Meteor.settings.public.forms.commons.SUBMIT_BTN_LBL}
                        </Button>
                      </Grid>
                    </Grid>
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
