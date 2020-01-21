import { Meteor } from "meteor/meteor";

import Messages from "../Messages";
import DispatchQueue from "../../dispatch-queue/Queue";

Meteor.methods({
  "messages.enqueue"({ ids, message, from, account }) {
    const _id = Messages.insert({
      owner: from,
      content: message,
      accountid: account
    });
    const _ids = ids.map(id =>
      DispatchQueue.insert({ to: id, messageid: _id })
    );
    if (ids.length == _ids.length) {
      Meteor.call("messages.send", _id);
      return { enqueued: true };
    }
    return { enqueued: false };
  },
  "messages.send"(_id) {
    // create dispatch job
    // call meteor method queue.dispatch every job cycle
    Meteor.call("queue.dispatch", _id);
  }
});
