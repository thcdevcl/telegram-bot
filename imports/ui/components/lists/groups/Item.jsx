import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Avatar, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container alignItems="center" style={{ height: "100%" }}>
            <Typography
              variant="h5"
              color="primary"
              classes={{ root: classNames(hover && classes.underline) }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
