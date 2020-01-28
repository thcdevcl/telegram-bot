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
    if (_ids.length == ids.length) {
      const enqueued = Meteor.call("messages.send", _id, _ids.length);
      return { enqueued };
    }
    throw new Error();
  },
  "messages.send"(_id, repeats) {
    const job = new Job("sendMessage", "dispatchQueue", { messageid: _id });
    job
      .priority("normal")
      .repeat({
        repeats,
        wait: 100
      })
      .save();
    return job ? true : false;
  },
  "messages.close"(_id) {
    Messages.update(_id, { $set: { sent: true, status: false } });
  }
});
