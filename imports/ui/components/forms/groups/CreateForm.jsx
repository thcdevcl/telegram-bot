import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Formik } from "formik";

import { Button, Grid, TextField } from "@material-ui/core";

import Notify from "../../../../modules/notification";

import Spinner from "../../utils/Spinner";

const CREATE_GROUP = gql`
  mutation createGroup($group: GroupInput!) {
    createGroup(group: $group) {
      id
    }
  }
`;

export default ({ onCancel }) => (
  <Mutation mutation={CREATE_GROUP}>
    {(createGroup, { error, loading }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      return (
        <Formik
          initialValues={{ name: "" }}
          onSubmit={({ name }, { setSubmitting }) => {
            setSubmitting(true);
            const group = { name };
            createGroup({ variables: { group } })
              .then(() => {
                Notify();
                onCancel();
              })
              .catch(error => Notify({ error }));
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
              </form>
            );
          }}
        </Formik>
      );
    }}
  </Mutation>
);
