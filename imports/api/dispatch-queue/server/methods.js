import { Meteor } from "meteor/meteor";

import Queue from "../Queue";

Meteor.methods({
  "queue.dispatch"(_id) {
    const dispatch = Queue.findOne(
      { messageid: _id, sent: false },
      { sort: { createdAt: -1 } }
    );
    console.log(queue);
    return true;
  }
});
