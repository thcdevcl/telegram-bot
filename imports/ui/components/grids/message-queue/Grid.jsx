import React, { useState } from "react";
import classNames from "classnames";

import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  selectedBackground: { background: theme.palette.grey[300] }
}));

export default ({ messages }) => {
  const classes = useStyles();
  const [state, setState] = useState({ selected: "" });
  const { selected } = state;
  return (
    <Grid container spacing={2} style={{ width: "100%" }}>
      <Grid item xs={selected ? 6 : 12} sm={6}>
        <Typography variant="h6" gutterBottom>
          Messages
        </Typography>
        <Grid container>
          {messages.map(({ _id, content, sent, createdAt }) => (
            <Grid
              item
              xs={12}
              key={_id}
              component={Card}
              elevation={2}
              style={{ padding: 8 }}
              onClick={event => setState(prev => ({ ...prev, selected: _id }))}
              classes={{
                item: classNames(selected == _id && classes.selectedBackground)
              }}
            >
              <Typography variant="caption">Created: {createdAt}</Typography>
              <Typography variant="body1">Sent:{sent.toString()}</Typography>
              <Typography variant="body2">Content: {content}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {selected && (
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            Recipients
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>To</TableCell>
                <TableCell align="right">Sent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages
                .find(message => message._id == selected)
                .queue.map(dispatch => (
                  <TableRow key={dispatch._id}>
                    <TableCell>{dispatch.to}</TableCell>
                    <TableCell align="right">
                      {dispatch.sent.toString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      )}
    </Grid>
  );
};
