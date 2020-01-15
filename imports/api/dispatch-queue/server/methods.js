import { Meteor } from "meteor/meteor";

import Messages from "../../messages/Messages";
import DispatchQueue from "../Queue";

Meteor.methods({
  "messages.enqueue"({ ids, message, from }) {
    const messageid = Messages.insert({ owner: from, content: message });
    const _ids = ids.map(id => DispatchQueue.insert({ to: id, messageid }));
    return { enqueued: ids.length == _ids.length };
  },
  "messages.dispatch"() {
    const dispatch = DispatchQueue.findOne(
      { sent: false },
      { sort: { createdAt: 1 }, limit: 1 }
    );
    if (dispatch) {
      const sender = Meteor.users.findOne({ _id: dispatch.from });
      const { api_id, api_hash, session_string } = sender.profile.app;

      // count messages sent last 24 hrs

      // find if user.profile.limit < messages sent

      // const res = HTTP.post(
      //   Meteor.settings.private.services.telethon_api.BASE_URL +
      //     `send-message`,
      //   {
      //     headers: {
      //       "api-id": api_id,
      //       "api-hash": api_hash,
      //       "session-string": session_string,
      //       "to": dispatch.to,
      //       "message": dispatch.message
      //     }
      //   }
      // );

      // if res, mark message as sent
      // const _id = DispatchQueue.update(
      //   { _id: dispatch._id },
      //   { $set: { sent: true, sentAt: new Date().toISOString() } }
      // );
      return { sent: true };
    }
    return { sent: false };
  }
});
