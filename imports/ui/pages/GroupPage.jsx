import React from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import Page from "../layouts/PageLayout";

import Message from "../components/forms/groups/MessageForm";

const useStyles = makeStyles(theme => ({
  members: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
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
  const classes = useStyles();
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
              <Grid item xs={10} md={9}>
                <Grid
                  container
                  style={{ padding: `16px 24px` }}
                  direction="column"
                >
                  <Typography
                    variant="h5"
                    paragraph
                    align="center"
                    component={Link}
                    to={`${Meteor.settings.public.router.participants.PATH}/${group.id}`}
                    classes={{ root: classNames(classes.members) }}
                  >{`Participants: ${group.participants.length}`}</Typography>
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
