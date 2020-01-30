import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Messages = new Mongo.Collection("messages");

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Messages.schema = new SimpleSchema({
  status: {
    type: Boolean,
    optional: false,
    label: "Active",
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  sent: {
    type: Boolean,
    optional: false,
    label: "Sent",
    autoValue() {
      if (this.isInsert) return false;
    }
  },
  owner: {
    type: String,
    optional: false,
    label: "User _id who created this message."
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
  content: {
    type: String,
    optional: false,
    label: "Content"
  },
  accountid: {
    type: String,
    optional: false,
    label: "Telegram Account _id"
  },
  currentJob: {
    type: String,
    optional: true,
    label: "current job _id"
  }
});

Messages.attachSchema(Messages.schema);

export default Messages;
