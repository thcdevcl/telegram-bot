import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  activeLink: {
    backgroundColor: theme.palette.grey[300]
  },
  icon: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) / 2,
    display: "inline-block"
  },
  label: {
    clear: "both",
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  bottom: { marginTop: "auto" }
}));

function Item({
  children,
  label,
  open,
  to,
  history,
  location,
  toggleDrawer,
  handleClick,
  bottom
}) {
  const classes = useStyles();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdOnly = useMediaQuery(theme.breakpoints.only("md"));
  const labelProps = {
    classes: {
      root: classes.label
    }
  };
  const active = location.pathname === to;
  return (
    <ListItem
      button
      divider
      dense
      classes={{
        root: classNames(active && classes.activeLink, bottom && classes.bottom)
      }}
      onClick={event => {
        if (!mdOnly && !lgUp) toggleDrawer();
        if (handleClick) handleClick();
        else history.push(to);
      }}
    >
      <ListItemIcon
        classes={{
          root: classNames(classes.icon)
        }}
      >
        {children}
      </ListItemIcon>
      {(open || lgUp) && (
        <ListItemText
          classes={{
            root: classNames(classes.icon)
          }}
          primary={label}
          primaryTypographyProps={labelProps}
        />
      )}
    </ListItem>
  );
}
export default withRouter(Item);
