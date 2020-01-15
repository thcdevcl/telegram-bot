import React, { useState } from "react";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MessageForm from "../forms/groups/MessageForm";

const useStyles = makeStyles(theme => ({
  buttonContainer: { "&:hover": { cursor: "pointer" } }
}));

export default ({ groups, account }) => {
  const classes = useStyles();
  const [state, setState] = useState({ selected: "", button: true });
  const { selected, button } = state;
  return (
    <Grid container>
      {button ? (
        <Grid
          item
          xs={12}
          onClick={event => setState(prev => ({ ...prev, button: !button }))}
          classes={{ item: classes.buttonContainer }}
        >
          <Typography
            variant="h6"
            align="center"
            style={{ border: "1px solid gray", padding: "16px 32px" }}
          >
            Message Group
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="group-select">Message Group</InputLabel>
            <Select
              labelId="group-select"
              id="selected"
              value={selected}
              onChange={event => setState({ selected: event.target.value })}
            >
              {groups.map(group => (
                <MenuItem key={group.id} value={group.id}>
                  {group.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selected && (
            <MessageForm
              onCancel={event => setState({ selected: "", button: !button })}
              ids={groups.find(group => group.id == selected).participantids}
              account={account}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
