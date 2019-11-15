import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";

import Spinner from "../components/utils/Spinner";

import Page from "../layouts/PageLayout";

import Message from "../components/forms/groups/MessageForm";

const GROUP = gql`
  query group($id: ID!) {
    group(id: $id) {
      id
      title
      participants {
        id
      }
    }
  }
`;

export default () => {
  const { id } = useParams();
  return (
    <Query query={GROUP} variables={{ id }}>
      {({ error, loading, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { group } = data;
        return (
          <Page headline={group.title}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  paragraph
                  align="center"
                >{`Members: ${group.participants.length}`}</Typography>
              </Grid>
              <Grid item xs={10} md={9}>
                <Grid container style={{ padding: `16px 24px` }}>
                  <Message ids={group.participants.map(({ id }) => id)} />
                </Grid>
              </Grid>
            </Grid>
          </Page>
        );
      }}
    </Query>
  );
};
