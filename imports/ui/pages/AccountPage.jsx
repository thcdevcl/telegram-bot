import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import MessageGroup from "../components/cards/MessageGroup";
import Page from "../layouts/PageLayout";
import Spinner from "../components/utils/Spinner";

function AccountPage({ _id, name, groups, queue }) {
  return (
    <Page headline={name}>
      <Grid container justify="center" spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <MessageGroup groups={groups} account={_id} />
        </Grid>
        {queue.length > 0 && (
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" style={{ fontWeight: 900 }}>
              For Dispatch
            </Typography>
            <Table size="small" aria-label="queue table">
              <TableHead>
                <TableRow>
                  <TableCell>To</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Sent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queue.map(q => (
                  <TableRow key={q.to}>
                    <TableCell component="th" scope="row">
                      {q.to}
                    </TableCell>
                    <TableCell>{q.messageid}</TableCell>
                    <TableCell>{q.sent.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
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
      queue {
        to
        messageid
        sent
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
        console.log(data);
        return <AccountPage {...account} />;
      }}
    </Query>
  );
};
