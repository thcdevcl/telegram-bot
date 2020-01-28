import { Meteor } from "meteor/meteor";

import Queue from "../Queue";

Meteor.methods({
  "queue.dispatch"(_id) {
    const dispatch = Queue.findOne(
      { messageid: _id, sent: false },
      { sort: { createdAt: -1 } }
    );
    // CALL TELETONAPI
    Queue.update(dispatch._id, {
      $set: { sentAt: new Date().toISOString(), sent: true }
    });
    const remaining = Queue.find(
      { messageid: _id, sent: false },
      { sort: { createdAt: -1 } }
    ).fetch().length;
    if (remaining == 0) Meteor.call("messages.close", _id);
    return true;
  }
});
