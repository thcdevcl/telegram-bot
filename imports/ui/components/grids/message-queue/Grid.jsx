import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import {
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import Spinner from "../../utils/Spinner";

import ToggleMessageStatus from "../../buttons/ToggleMessageStatusButton";

const useStyles = makeStyles(theme => ({
  selectedBackground: { background: theme.palette.grey[300] }
}));

function MessageQueueGrid({ messages }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [state, setState] = useState({ selected: "" });
  const { selected } = state;
  return (
    <Grid container spacing={2} style={{ width: "100%" }}>
      <Grid item xs={12} sm={6}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Messages
          </Typography>
          {selected && matches && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={event => setState(prev => ({ ...prev, selected: "" }))}
            >
              Clear
            </Button>
          )}
        </Grid>
        <Grid container>
          {messages
            .filter(message =>
              selected && matches ? message._id == selected : message
            )
            .map(({ _id, content, sent, createdAt, status }) => (
              <Grid
                item
                xs={12}
                key={_id}
                style={{ padding: 8, marginBottom: 8 }}
                onClick={event =>
                  setState(prev => ({ ...prev, selected: _id }))
                }
                classes={{
                  item: classNames(
                    selected == _id && classes.selectedBackground
                  )
                }}
                component={Card}
                elevation={2}
              >
                <Typography variant="caption">Created: {createdAt}</Typography>
                <Typography variant="body1">Sent:{sent.toString()}</Typography>
                <Typography variant="body2">Content: {content}</Typography>
                <ToggleMessageStatus
                  status={status}
                  sent={sent}
                  messageid={_id}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
      {selected && (
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Recipients
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>To</TableCell>
                <TableCell align="right">Sent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages
                .find(message => message._id == selected)
                .queue.map(dispatch => (
                  <TableRow key={dispatch._id}>
                    <TableCell>{dispatch.to}</TableCell>
                    <TableCell align="right">
                      {dispatch.sent.toString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      )}
    </Grid>
  );
}

const GET_ACCOUNT_MESSAGES = gql`
  query account($_id: ID!) {
    account(_id: $_id) {
      _id
      name
      messages {
        _id
        createdAt
        content
        status
        sent
        queue {
          _id
          to
          messageid
          sent
          sentAt
        }
      }
    }
  }
`;

export default ({ accountid }) => {
  return (
    <Query
      query={GET_ACCOUNT_MESSAGES}
      variables={{ _id: accountid }}
      fetchPolicy="network-only"
      pollInterval={250}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        return <MessageQueueGrid messages={data.account.messages} />;
      }}
    </Query>
  );
};
