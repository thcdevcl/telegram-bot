import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: "100%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  count: {
    color: theme.palette.primary.light,
    fontWeight: 600
  },
  darkerText: {
    color: theme.palette.primary.dark
  },
  row: { padding: 4 }
}));

const GROUP_COUNT = gql`
  query {
    checkClient {
      groupCount
    }
  }
`;

function GroupsCard({ groupCount }) {
  const classes = useStyles();
  const [state, setState] = useState({ hover: false });
  const { hover } = state;
  const toggleHover = () => setState(prev => ({ ...prev, hover: !hover }));
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid item xs={12} md={4}>
      <Card
        raised={matches ? true : hover}
        classes={{ root: classes.card }}
        component={Link}
        to={Meteor.settings.public.router.groups.PATH}
      >
        <CardContent
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: "100%" }}
            direction="column"
          >
            {(!hover || matches) && (
              <Typography variant="h5" align="center" gutterBottom>
                {Meteor.settings.public.dashboard.groups.HEADLINE}
              </Typography>
            )}
            {matches ? (
              <>
                <Typography
                  variant="h1"
                  align="center"
                  classes={{
                    root: classNames(classes.count, hover && classes.darkerText)
                  }}
                >
                  {groupCount}
                </Typography>
                <Button variant="contained" color="secondary">
                  {Meteor.settings.public.dashboard.groups.ACTION_BTN_LBL}
                </Button>
              </>
            ) : hover ? (
              <Button variant="contained" color="secondary">
                {Meteor.settings.public.dashboard.groups.ACTION_BTN_LBL}
              </Button>
            ) : (
              <Typography
                variant="h1"
                align="center"
                classes={{
                  root: classNames(classes.count, hover && classes.darkerText)
                }}
              >
                {groupCount}
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default () => (
  <Query query={GROUP_COUNT}>
    {({ error, data, loading }) => {
      if (loading) return <Spinner />;
      if (error) return `Error: ${error}`;
      const { checkClient } = data;
      return <GroupsCard groupCount={checkClient.groupCount} />;
    }}
  </Query>
);
