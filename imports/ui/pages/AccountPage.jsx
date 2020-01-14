import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import { Grid } from "@material-ui/core";

import Group from "../components/lists/groups/Item";
import Page from "../layouts/PageLayout";
import Spinner from "../components/utils/Spinner";

function AccountPage({ _id, name, groups }) {
  return (
    <Page headline={name}>
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

const GET_ACCOUNT = gql`
  query account($_id: ID!) {
    account(_id: $_id) {
      _id
      name
      groups {
        id
        title
        participantids
      }
    }
  }
`;

export default () => {
  const params = useParams();
  return (
    <Query query={GET_ACCOUNT} variables={{ _id: params._id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { account } = data;
        return <AccountPage {...account} />;
      }}
    </Query>
  );
};
