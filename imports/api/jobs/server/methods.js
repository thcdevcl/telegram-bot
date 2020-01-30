import { Meteor } from "meteor/meteor";

import Messages from "../../../api/messages/Messages";

import Jobs from "../../../startup/server/jobs";

Meteor.methods({
  "jobs.togglePause"(messageid, newStatus) {
    const message = Messages.findOne({ _id: messageid });
    Jobs.getJob(message.currentJob, function(err, job) {
      if (!err) {
        if (!newStatus) Jobs.pauseJobs([message.currentJob]);
        else {
          job.resume();
        }
      }
    });
    return message;
  }
});
