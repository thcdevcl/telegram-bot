import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "./accounts";
import "./api";
import sendMessageJobs from "./jobs";

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
    return sendMessageJobs.find({});
  });
  return sendMessageJobs.startJobServer();
});
