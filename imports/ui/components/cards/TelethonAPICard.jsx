import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  DialogContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notify from "../../../modules/notification";

import Spinner from "../utils/Spinner";

import ValidateCode from "../forms/telethon/ValidateCodeForm";

const useStyles = makeStyles(theme => ({
  card: { height: "100%" },
  row: { padding: 4 }
}));

const CHECK_CLIENT = gql`
  query {
    checkClient {
      authorized
      connected
    }
  }
`;

const CONNECT_CLIENT = gql`
  mutation {
    connectClient {
      connected
    }
  }
`;

const SEND_CODE = gql`
  mutation {
    sendCode {
      connected
    }
  }
`;

export default () => {
  const classes = useStyles();
  const [state, setState] = useState({ dialog: false, hover: false });
  const { dialog, hover } = state;
  const toggleDialog = () => setState(prev => ({ ...prev, dialog: !dialog }));
  const toggleHover = () => setState(prev => ({ ...prev, hover: !hover }));
  return (
    <Query query={CHECK_CLIENT}>
      {({ error, loading, data, refetch }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { authorized, connected } = data.checkClient;
        return (
          <Grid item xs={12}>
            <Grid
              container
              component={Card}
              classes={{ root: classes.card }}
              raised={hover}
            >
              <Grid
                container
                component={CardContent}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
              >
                <Grid container direction="column" justify="center">
                  <Typography variant="h5">
                    {Meteor.settings.public.dashboard.telethon_api.HEADLINE}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {Meteor.settings.public.dashboard.telethon_api.SUBTITLE}
                  </Typography>
                </Grid>
                <Grid
                  container
                  classes={{ container: classes.row }}
                  alignItems="center"
                  justify="space-between"
                >
                  <Typography variant="body1">
                    {Meteor.settings.public.dashboard.telethon_api.TELEGRAM}
                  </Typography>
                  {connected ? (
                    <Typography
                      variant="body2"
                      align="right"
                      style={{ fontWeight: 800 }}
                    >
                      {
                        Meteor.settings.public.dashboard.telethon_api
                          .TELEGRAM_STATUS_CONNECTED
                      }
                    </Typography>
                  ) : (
                    <Mutation mutation={CONNECT_CLIENT}>
                      {(connectClient, { error, loading }) => (
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={event => {
                            connectClient().then(() => {
                              refetch();
                              Notify({
                                message:
                                  Meteor.settings.public.dashboard.telethon_api
                                    .notifications.messages.CLIENT_CONNECTED
                              });
                            });
                          }}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner size={15} />
                          ) : (
                            Meteor.settings.public.dashboard.telethon_api
                              .CONNECT_BTN_LBL
                          )}
                        </Button>
                      )}
                    </Mutation>
                  )}
                </Grid>
                {!dialog && connected && (
                  <Grid
                    container
                    classes={{ container: classes.row }}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Typography variant="body1">
                      {
                        Meteor.settings.public.dashboard.telethon_api
                          .TELEGRAM_AUTH
                      }
                    </Typography>
                    {authorized ? (
                      <Typography variant="body2" style={{ fontWeight: 800 }}>
                        {
                          Meteor.settings.public.dashboard.telethon_api
                            .TELEGRAM_CLIENT_AUTHORIZED
                        }
                      </Typography>
                    ) : (
                      <Mutation mutation={SEND_CODE}>
                        {(sendCode, { error, loading }) => (
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={event =>
                              sendCode().then(() => {
                                toggleDialog();
                                refetch();
                                Notify({
                                  message:
                                    Meteor.settings.public.dashboard
                                      .telethon_api.notifications.messages
                                      .CODE_SENT
                                });
                              })
                            }
                            disabled={loading}
                          >
                            {loading ? (
                              <Spinner size={15} />
                            ) : (
                              Meteor.settings.public.dashboard.telethon_api
                                .SEND_BTN_LBL
                            )}
                          </Button>
                        )}
                      </Mutation>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Dialog open={dialog} onClose={toggleDialog} disableBackdropClick>
              <DialogTitle>
                {Meteor.settings.public.dashboard.telethon_api.DIALOG_TITLE}
              </DialogTitle>
              <DialogContent>
                <ValidateCode onCancel={toggleDialog} refetch={refetch} />
              </DialogContent>
            </Dialog>
          </Grid>
        );
      }}
    </Query>
  );
};
