import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Queue = new Mongo.Collection("queue");

Queue.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Queue.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Queue.schema = new SimpleSchema({
  messageid: {
    type: String,
    optional: false,
    label: "message _id"
  },
  sent: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return false;
    }
  },
  sentAt: {
    type: String,
    label: "The date this message was sent.",
    autoValue() {
      if (this.isInsert) return "";
    }
  },
  createdAt: {
    type: String,
    label: "The date this document was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this document was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  to: {
    type: String,
    optional: false,
    label: "telegram user id"
  }
});

Queue.attachSchema(Queue.schema);

export default Queue;
