import React from "react";
import { PropTypes } from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { GlobalContextConsumer } from "../../../startup/client/App";
import { withStyles } from "@material-ui/styles";

import Helmet from "../utils/Helmet";

import Navigation from "../../layouts/NavigationLayout";

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
  return (
    <GlobalContextConsumer>
      {context => {
        if (!context.currentUser) return <Redirect to="/" />;
        return (
          <Route
            exact={exact}
            path={path}
            render={props => (
              <>
                <Helmet title={title} name={name} content={content} />
                <Navigation />
                <main className={classes.main}>
                  {React.createElement(component)}
                </main>
              </>
            )}
          />
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
