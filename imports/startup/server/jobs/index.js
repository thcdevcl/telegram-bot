import Messages from "../../../api/messages/Messages";

const jobs = JobCollection("sendMessage");

jobs.allow({
  // Grant full permission to any authenticated user
  admin: function(userId, method, params) {
    return userId ? true : false;
  }
});

Job.processJobs("sendMessage", "dispatchQueue", function(job, cb) {
  const message = Messages.findOne({ _id: job.data.messageid });
  if (message.status) {
    job.done("done", { repeatId: true }, function(err, newid) {
      const dispatched = Meteor.call("queue.dispatch", job.data.messageid);
      if (dispatched) {
        Messages.update(job.data.messageid, { $set: { currentJob: newid } });
      } else {
        job.fail("Some error happened...");
      }
    });
  }
  cb();
});

export default jobs;
