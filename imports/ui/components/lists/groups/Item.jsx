import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Mail } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    marginBottom: theme.spacing(1),
    "&:hover": {
      cursor: "pointer"
    }
  },
  underline: {
    textDecoration: "underline"
  }
}));

export default ({ id, title }) => {
  const classes = useStyles();
  const [state, setState] = useState({ hover: false });
  const { hover } = state;
  const toggleHover = () => setState(prev => ({ ...prev, hover: !hover }));
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid item xs={12}>
      <Grid
        container
        classes={{ container: classes.rootContainer }}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        component={Link}
        to={`${Meteor.settings.public.router.groups.PATH}/${id}`}
      >
        <Grid item xs={2}>
          <Grid container justify="center" alignItems="center">
            <Avatar
              src="https://via.placeholder.com/150"
              style={{ height: 50, width: 50 }}
              component={Card}
              raised={hover || matches}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{ height: "100%", flexWrap: "nowrap" }}
          >
            <Typography
              variant="h5"
              color="primary"
              classes={{ root: classNames(hover && classes.underline) }}
            >
              {title}
            </Typography>
            {(matches || hover) && (
              <Button size="small" variant="contained" color="secondary">
                Bulk
                <Mail />
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
