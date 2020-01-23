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
      const enqueued = Meteor.call("messages.send", _id);
      return { enqueued };
    }
    throw new Error();
  },
  "messages.send"(_id) {
    const job = new Job("sendMessage", "dispatchQueue", { messageid: _id });
    job.priority("normal").save();
    return job ? true : false;
  }
});
