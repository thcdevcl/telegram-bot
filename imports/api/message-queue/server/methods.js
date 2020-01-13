import { Meteor } from "meteor/meteor";

import MessageQueue from "../Queue";

Meteor.methods({
  "messages.enqueue"({ ids, message, from }) {
    const _ids = ids.map(id => MessageQueue.insert({ from, to: id, message }));
    return { enqueued: ids.length == _ids.length };
  },
  "messages.dispatch"() {
    const dispatch = MessageQueue.findOne(
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
      // const _id = MessageQueue.update(
      //   { _id: dispatch._id },
      //   { $set: { sent: true, sentAt: new Date().toISOString() } }
      // );
      return { sent: true };
    }
    return { sent: false };
  }
});
