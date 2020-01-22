import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "./accounts";
import "./api";

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
  const jobs = JobCollection("dispatchJob");
  jobs.allow({
    // Grant full permission to any authenticated user
    admin: function(userId, method, params) {
      return userId ? true : false;
    }
  });
  return jobs.startJobServer();
});
