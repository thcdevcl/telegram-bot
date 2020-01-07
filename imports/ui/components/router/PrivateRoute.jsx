import React, { useState } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { GlobalContextConsumer } from "../../../startup/client/App";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/styles";

import Helmet from "../utils/Helmet";

import Navigation from "../../layouts/NavigationLayout";

import TelegramApp from "../forms/settings/TelegramAppForm";
import ValidateCode from "../forms/telethon/ValidateCodeForm";

const styles = theme => ({
  main: {
    display: "flex",
    flex: 1,
    overflow: "scroll",
    backgroundColor: theme.palette.background.default,
    padding: 24,
    marginTop: 64,
    [theme.breakpoints.down("xs")]: {
      marginTop: 56,
      marginLeft: 0
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 60
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 220
    }
  },
  drawerPadding: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 200
    }
  },
  open: {
    paddingLeft: 200
  }
});

function PrivateRoute({
  admin,
  classes,
  component,
  exact,
  path,
  rootAdmin,
  title,
  name,
  content
}) {
  if (!Meteor.userId()) return <Redirect to="/" />;
  const [state, setState] = useState({ open: false, dialog: false });
  const { open, dialog } = state;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const toggleDialog = () =>
    setState(prevState => ({ ...prevState, dialog: !dialog }));
  return (
    <GlobalContextConsumer>
      {({ currentUser, telethonapi }) => {
        if (!currentUser) return <Redirect to="/" />;
        const {
          api_id,
          api_hash,
          phone,
          session_string
        } = currentUser.profile.app;
        const { authorized, connected } = telethonapi;
        return (
          <Route exact={exact} path={path}>
            <Helmet title={title} name={name} content={content} />
            <Navigation
              onToggle={event =>
                setState(prevState => ({ ...prevState, open: !open }))
              }
            />
            {authorized && connected && (
              <main
                className={classNames(classes.main, md && open && classes.open)}
              >
                {React.createElement(component)}
              </main>
            )}
            <Dialog
              open={!authorized || !connected || session_string.length == 0}
              disableBackdropClick
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Telegram APP</DialogTitle>
              <DialogContent>
                {api_id.length == 0 &&
                api_hash.length == 0 &&
                phone.length == 0 &&
                session_string.length == 0 ? (
                  <TelegramApp
                    toggable={
                      api_id.length > 0 &&
                      api_hash.length > 0 &&
                      phone.length > 0
                    }
                    onCancel={toggleDialog}
                  />
                ) : !authorized || !connected ? (
                  <ValidateCode />
                ) : null}
              </DialogContent>
            </Dialog>
          </Route>
        );
      }}
    </GlobalContextConsumer>
  );
}

PrivateRoute.propTypes = {
  admin: PropTypes.bool,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string,
  rootAdmin: PropTypes.bool,
  content: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(styles)(PrivateRoute);
