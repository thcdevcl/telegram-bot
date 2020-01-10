import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Grid } from "@material-ui/core";

import Spinner from "../components/utils/Spinner";

import Group from "../components/lists/groups/Item";
import Page from "../layouts/PageLayout";

function GroupsPage({ groups }) {
  return (
    <Page headline="Groups">
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          {groups.map(group => (
            <Group key={group.id} {...group} />
          ))}
        </Grid>
      </Grid>
    </Page>
  );
}

const GET_GROUPS = gql`
  query {
    currentUser {
      _id
      profile {
        app {
          api_id
          api_hash
          session_string
        }
      }
      groups {
        id
        title
        participantids
      }
    }
  }
`;

export default () => (
  <Query query={GET_GROUPS}>
    {({ error, loading, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      const { groups } = data.currentUser;
      return <GroupsPage groups={groups} />;
    }}
  </Query>
);
