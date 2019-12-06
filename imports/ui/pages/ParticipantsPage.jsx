import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import Page from "../layouts/PageLayout";

const useStyles = makeStyles(theme => ({
  item: {
    margin: `4px 0px`,
    padding: `4px ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper
  }
}));

const GROUP = gql`
  query group($id: ID!) {
    group(id: $id) {
      id
      title
      participants {
        id
        username
        first_name
        last_name
      }
    }
  }
`;

export default () => {
  const { id } = useParams();
  const classes = useStyles();
  return (
    <Query query={GROUP} variables={{ id }}>
      {({ error, loading, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { group } = data;
        return (
          <Page headline={group.title}>
            <Grid container justify="center">
              {group.participants.length > 0 &&
                group.participants.map(participant => (
                  <Grid
                    key={participant.id}
                    item
                    xs={12}
                    classes={{ root: classes.item }}
                  >
                    <Typography variant="h6" color="primary">
                      {participant.username
                        ? participant.username
                        : `${participant.first_name} ${participant.last_name}`}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </Page>
        );
      }}
    </Query>
  );
};
