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
      Meteor.call("queue.dispatch", job.data.messageid);
    });
  }
  cb();
});

export default jobs;
