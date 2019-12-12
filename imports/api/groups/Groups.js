import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Groups = new Mongo.Collection("groups");

Groups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Groups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Groups.schema = new SimpleSchema({
  status: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    },
    label: "Deleted or not."
  },
  createdAt: {
    type: String,
    label: "The date this group was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this group was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  owner: {
    type: String,
    optional: false,
    label: "_id of user that created this group."
  },
  name: {
    type: String,
    optional: false,
    label: "Group name."
  },
  participantids: [String]
});

Groups.attachSchema(Groups.schema);

export default Groups;
