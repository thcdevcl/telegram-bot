import React from "react";
import classNames from "classnames";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import {
  Drawer,
  Grid,
  IconButton,
  List,
  useMediaQuery
} from "@material-ui/core";
import {
  Dashboard,
  ChevronLeft,
  ChevronRight,
  ExitToApp
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { GlobalContextConsumer } from "../../../../startup/client/App";

import Item from "./Item";

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  drawerHeadContainer: {
    minHeight: 56,
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    [theme.breakpoints.up("sm")]: {
      minHeight: 64
    }
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    height: "100%",
    [theme.breakpoints.only("md")]: {
      backgroundColor: theme.palette.background.paper
    }
  },
  list: {
    padding: 0,
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  miniDrawerPaper: {
    width: 60,
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth
    },
    background: theme.palette.background.paper,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  openDrawer: {
    zIndex: 1500
  }
}));

function PrivateDrawer({ open, toggleDrawer, client, history }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const mdOnly = useMediaQuery(theme.breakpoints.only("md"));
  return (
    <GlobalContextConsumer>
      {context => {
        return (
          <Drawer
            variant={matches ? "temporary" : "permanent"}
            open={open}
            anchor={matches ? "right" : "left"}
            onClose={() => toggleDrawer()}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !open && classes.miniDrawerPaper,
                open && classes.openDrawer
              )
            }}
            onMouseEnter={() => {
              mdOnly ? toggleDrawer() : () => {};
            }}
            onMouseLeave={() => {
              mdOnly ? toggleDrawer(true) : () => {};
            }}
          >
            <Grid
              container
              justify="flex-end"
              classes={{ container: classes.drawerHeadContainer }}
            >
              {matches && (
                <IconButton
                  onClick={toggleDrawer}
                  classes={{ root: classes.iconButton }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronLeft />
                  ) : (
                    <ChevronRight />
                  )}
                </IconButton>
              )}
            </Grid>
            <List classes={{ root: classes.list }}>
              <Item
                label={Meteor.settings.public.router.index.home.TITLE}
                open={open}
                to={Meteor.settings.public.router.index.PATH}
                toggleDrawer={toggleDrawer}
              >
                <Dashboard />
              </Item>
              <Item
                label="Logout"
                open={open}
                toggleDrawer={toggleDrawer}
                handleClick={() =>
                  Meteor.logout(() => {
                    client.resetStore(() =>
                      history.push(Meteor.settings.public.router.index.PATH)
                    );
                  })
                }
                bottom
              >
                <ExitToApp />
              </Item>
            </List>
          </Drawer>
        );
      }}
    </GlobalContextConsumer>
  );
}

export default withApollo(withRouter(PrivateDrawer));
