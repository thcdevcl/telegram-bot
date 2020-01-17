import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { Jobs } from "meteor/msavin:sjobs";

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

  Jobs.configure({
    autoStart: false,
    interval: 1000
  });

  Jobs.register({
    dispatch: function() {
      const instance = this;
      const res = Meteor.call("messages.dispatch");
      instance.replicate({ in: { seconds: 1 } });
      if (res) instance.success(res);
    }
  });

  Jobs.run("dispatch");
});
