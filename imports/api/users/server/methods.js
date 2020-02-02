import { Meteor } from "meteor/meteor";

import Profiles from "../../profiles/Profiles";
import Messages from "../../messages/Messages";
import Queue from "../../dispatch-queue/Queue";

// import Jobs from "../../../startup/server/jobs";

Meteor.methods({
  "users.checkLimit"(_id) {
    const messages = Messages.find({ owner: _id }).fetch();
    const messagesids = messages.map(({ _id }) => _id);
    // const currentjobids = messages.map(
    //   ({ currentJob }) => currentJob && currentJob
    // );
    const { limit } = Profiles.findOne({ owner: _id });
    let dispatchedCount = 0;
    dispatchedCount = Queue.find({
      messageid: { $in: messagesids },
      sent: true,
      sentAt: {
        $gte: new Date(new Date().setHours(00, 00, 00)).toISOString(),
        $lt: new Date(new Date().setHours(23, 59, 59)).toISOString()
      }
    }).fetch().length;
    // if (dispatchedCount > limit) Jobs.pauseJobs(currentjobids);
    return dispatchedCount <= limit;
  }
});
