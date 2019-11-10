import React, { useState } from "react";

import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PrivateDrawer from "../components/navigation/drawer/Private";
import Toolbar from "../components/navigation/Toolbar";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default ({ onToggle }) => {
  const classes = useStyles();
  const [state, setState] = useState({ open: false });
  const { open } = state;
  return (
    <nav>
      <AppBar color="primary" position="fixed" className={classes.appBar}>
        <Toolbar
          open={open}
          toggleDrawer={() => {
            setState(prev => ({ ...prev, open: !prev.open }));
            onToggle();
          }}
        />
      </AppBar>
      {Meteor.userId() && (
        <PrivateDrawer
          open={open}
          toggleDrawer={closed => {
            setState(prev => ({ ...prev, open: closed ? false : !prev.open }));
            onToggle();
          }}
        />
      )}
    </nav>
  );
};
