import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Grid } from "@material-ui/core";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";

import Spinner from "../utils/Spinner";

const TOGGLE_MESSAGE_STATUS = gql`
  mutation toggleMessageStatus($_id: ID!, $status: Boolean!) {
    toggleMessageStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

export default ({ messageid, status, sent }) => {
  const [toggleMessageStatus, { loading, error, data }] = useMutation(
    TOGGLE_MESSAGE_STATUS
  );

  if (sent) return null;
  if (loading) return <Spinner />;
  if (error) return `Error: ${error}`;
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={event =>
        toggleMessageStatus({ variables: { _id: messageid, status: !status } })
      }
    >
      {status ? <Pause /> : <PlayArrow />}
    </Button>
  );
};
