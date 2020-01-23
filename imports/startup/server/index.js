import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "./accounts";
import "./api";

export const jobs = JobCollection("sendMessage");

jobs.allow({
  // Grant full permission to any authenticated user
  admin: function(userId, method, params) {
    return userId ? true : false;
  }
});

Meteor.startup(() => {
  console.log("server started");
  Roles.createRole("admin", { unlessExists: true });
  Roles.createRole("user", { unlessExists: true });
  if (Meteor.users.find().fetch().length === 0) {
    Accounts.createUser({
      email: "rootadmin@eleven.bot",
      password: "rootadmin",
      profile: {
        role: "admin"
      }
    });
  }
  Meteor.publish("allJobs", function() {
    return jobs.find({});
  });
  Job.processJobs("sendMessage", "dispatchQueue", function(job, cb) {
    console.log(job);
  });
  return jobs.startJobServer();
});
