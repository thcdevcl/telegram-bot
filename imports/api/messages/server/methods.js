import { Meteor } from "meteor/meteor";

import Messages from "../Messages";
import DispatchQueue from "../../dispatch-queue/Queue";
import Profiles from "../../profiles/Profiles";
import TelegramAccounts from "../../telegram-accounts/TelegramAccounts";

Meteor.methods({
  "messages.enqueue"({ ids, message, from, account }) {
    const messageid = Messages.insert({
      owner: from,
      content: message,
      accountid: account
    });
    const _ids = ids.map(id => DispatchQueue.insert({ to: id, messageid }));
    return { enqueued: ids.length == _ids.length };
  },
  "messages.dispatch"() {
    const dispatch = DispatchQueue.findOne(
      { sent: false },
      { sort: { createdAt: 1 }, limit: 1 }
    );
    if (dispatch) {
      const message = Messages.findOne({ _id: dispatch.messageid });
      const telegramAccount = TelegramAccounts.findOne({
        _id: message.accountid
      });
      const updateDispatch = _id =>
        DispatchQueue.update(
          { _id },
          { $set: { sent: true, sentAt: new Date().toISOString() } }
        );
      const { api_id, api_hash, session_string } = telegramAccount;
      if (Meteor.isDevelopment) {
        console.log(
          `message sent! to: ${dispatch.to}, messageid: ${message._id}`
        );
        return { sent: updateDispatch(dispatch._id) ? true : false };
      } else {
        const { data } = HTTP.post(
          Meteor.settings.private.services.telethon_api.BASE_URL +
            `send-message`,
          {
            headers: {
              "api-id": api_id,
              "api-hash": api_hash,
              "session-string": session_string,
              to: dispatch.to,
              message: message.content
            }
          }
        );
        if (data) updateDispatch(dispatch._id);
        return { sent: data };
      }
    }
    return { sent: false };
  }
});
