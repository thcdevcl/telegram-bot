import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import { Grid } from "@material-ui/core";

import MessageGroup from "../components/cards/MessageGroup";
import MessageQueue from "../components/grids/message-queue/Grid";
import Page from "../layouts/PageLayout";
import Spinner from "../components/utils/Spinner";

function AccountPage({ _id, name, groups }) {
  return (
    <Page headline={name}>
      <Grid container justify="center" spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={9} style={{ marginBottom: 16 }}>
          <MessageGroup groups={groups} account={_id} />
        </Grid>
        <Grid item xs={12} md={9} style={{ marginBottom: 16 }}>
          <MessageQueue accountid={_id} />
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
    <Query
      query={GET_ACCOUNT}
      variables={{ _id: params._id }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { account } = data;
        return <AccountPage {...account} />;
      }}
    </Query>
  );
};
