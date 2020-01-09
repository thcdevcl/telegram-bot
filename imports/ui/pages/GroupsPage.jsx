import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Grid } from "@material-ui/core";

import Spinner from "../components/utils/Spinner";

import Group from "../components/lists/groups/Item";
import Header from "../layouts/pages/headers/GroupsHeaderLayout";
import Page from "../layouts/PageLayout";

function GroupsPage({ groups }) {
  return (
    <Page header={<Header />}>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Grid container>
            {groups.map(group => (
              <Group key={group.id} {...group} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

const GET_GROUPS = gql`
  query {
    checkClient {
      groups {
        _id
        id
        title
      }
    }
  }
`;

export default () => (
  <Query query={GET_GROUPS} fetchPolicy="network-only">
    {({ error, loading, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      const { groups } = data.checkClient;
      return <GroupsPage groups={groups} />;
    }}
  </Query>
);
