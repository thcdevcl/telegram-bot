import React, { useState } from "react";
import classNames from "classnames";

import {
  Avatar,
  Card,
  Grid,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { Message } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MessageForm from "../../forms/groups/MessageForm";

const useStyles = makeStyles(theme => ({
  rootContainer: {
    backgroundColor: theme.palette.background.paper,
    margin: "8px 0px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  icon: {
    color: theme.palette.common.white
  },
  iconBigger: {
    fontSize: "2rem"
  },
  messageContainer: {
    height: "100%",
    background: theme.palette.secondary.main
  },
  underline: {
    textDecoration: "underline"
  }
}));

export default ({ id, title, participantids }) => {
  const classes = useStyles();
  const [state, setState] = useState({ hover: false, form: false });
  const { hover, form } = state;
  const toggleHover = () => setState(prev => ({ ...prev, hover: !hover }));
  const toggleForm = () => setState(prev => ({ ...prev, form: !form }));
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {form ? (
        <MessageForm
          onCancel={() => toggleForm()}
          ids={participantids}
          to={title}
        />
      ) : (
        <Grid
          container
          classes={{ container: classes.rootContainer }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          onClick={event => toggleForm()}
        >
          <Grid item xs={2} style={{ padding: "8px 4px" }}>
            <Grid container justify="center" alignItems="center">
              <Avatar
                src="https://via.placeholder.com/150"
                style={{ height: 50, width: 50 }}
                component={Card}
                raised={hover || matches}
              />
            </Grid>
          </Grid>
          <Grid item xs={8} style={{ padding: "8px 4px" }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%", flexWrap: "nowrap" }}
            >
              <Typography
                variant="h5"
                color="primary"
                classes={{ root: classNames(hover && classes.underline) }}
              >
                {title}
              </Typography>
              <Typography variant="caption" color="primary">
                {`Members: ${participantids.length}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid
              container
              justify="center"
              alignItems="center"
              classes={{ container: classes.messageContainer }}
            >
              <Message
                classes={{
                  root: classNames(classes.icon, hover && classes.iconBigger)
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
