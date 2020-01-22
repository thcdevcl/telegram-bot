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
    if (_ids.length == ids.length)
      return { enqueued: Meteor.call("messages.send", _id) };
    throw new Error();
  },
  "messages.send"(_id) {
    // create dispatch job
    // call meteor method queue.dispatch every job cycle
    return Meteor.call("queue.dispatch", _id);
  }
});
