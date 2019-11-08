import React from "react";
import { PropTypes } from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/styles";

import Helmet from "../utils/Helmet";

const styles = theme => ({
  main: {}
});

const PublicRoute = ({
  classes,
  component,
  exact,
  path,
  title,
  name,
  content
}) => {
  if (Meteor.userId()) return <Redirect to="/" />;
  return (
    <Route
      exact={exact}
      path={path}
      render={props => (
        <>
          <Helmet title={title} name={name} content={content} />
          <main className={classes.main}>{React.createElement(component)}</main>
        </>
      )}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string,
  content: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(styles)(PublicRoute);
