const jobs = JobCollection("sendMessage");

jobs.allow({
  // Grant full permission to any authenticated user
  admin: function(userId, method, params) {
    return userId ? true : false;
  }
});

Job.processJobs("sendMessage", "dispatchQueue", function(job, cb) {
  const message = Messages.findOne({ _id: job.data.messageid });
  const sent = Meteor.call("queue.dispatch", job.data.messageid);
  // check if job done
});

export default jobs;
