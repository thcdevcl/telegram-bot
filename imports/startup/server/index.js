import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "./api";

Meteor.startup(() => {
  console.log("server started");
  if (Meteor.users.find().fetch().length === 0) {
    Accounts.createUser({
      email: "rootadmin@eleven.bot",
      password: "rootadmin"
    });
  }
});
