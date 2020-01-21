import { Meteor } from "meteor/meteor";

Meteor.methods({
  "queue.dispatch"(_id) {
    console.log(_id);
    return { dispatched: true };
  }
});
