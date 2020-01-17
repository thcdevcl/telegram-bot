import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ValidateCode from "../../forms/accounts/ValidateCodeForm";

const useStyles = makeStyles(theme => ({
  rootContainer: { border: "1px solid grey", padding: theme.spacing(1) },
  hover: {
    cursor: "pointer"
  }
}));

export default ({ account, refetch }) => {
  const classes = useStyles();
  const history = useHistory();
  const { authorized, connected } = account.telethon;
  return (
    <Grid
      container
      classes={{
        container: classNames(
          classes.rootContainer,
          authorized && connected && classes.hover
        )
      }}
      onClick={event =>
        authorized && connected && history.push(`/accounts/${account._id}`)
      }
    >
      <Typography variant="subtitle1">{account.name}</Typography>
      {!authorized && connected && (
        <ValidateCode {...account} refetch={refetch} />
      )}
    </Grid>
  );
};
