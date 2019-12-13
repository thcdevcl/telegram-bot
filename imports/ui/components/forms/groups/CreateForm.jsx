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
      _id
      id
      title
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
          initialValues={{ title: "" }}
          onSubmit={({ title }, { setSubmitting }) => {
            setSubmitting(true);
            const group = { title };
            createGroup({ variables: { group } })
              .then(() => {
                onCancel();
                Notify({ message: "Group created." });
              })
              .catch(error => Notify({ error }));
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => {
            if (isSubmitting) return <Spinner />;
            const { title } = values;
            return (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <TextField
                    id="title"
                    margin="dense"
                    variant="outlined"
                    values={title}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Title"
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
