import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import {
  Grid,
  IconButton,
  Typography,
  Toolbar,
  useMediaQuery
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  logo: {
    "&:link": {
      textDecoration: "none"
    }
  },
  drawerMargin: {
    [theme.breakpoints.up("md")]: {
      marginLeft: 216
    }
  },
  menuButton: {
    color: theme.palette.common.white
  }
}));

function Private({ toggleDrawer, open }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Toolbar>
      <Grid container justify="space-between" alignItems="center">
        <Typography
          variant="h6"
          color="secondary"
          classes={{
            h6: classNames(classes.logo, open && classes.drawerMargin)
          }}
          component={Link}
          to="/"
        >
          {Meteor.settings.public.app.NAME_SHORT}
        </Typography>
        {matches && Meteor.userId() && !open && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => {
              toggleDrawer();
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Grid>
    </Toolbar>
  );
}

export default Private;
