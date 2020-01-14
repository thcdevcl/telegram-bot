import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Profiles = new Mongo.Collection("profiles");

Profiles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Profiles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Profiles.schema = new SimpleSchema({
  owner: {
    type: String,
    optional: false,
    label: "The _id of user who created this document."
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
  role: {
    type: String,
    optional: false,
    label: "Role"
  },
  fullName: {
    type: String,
    autoValue() {
      if (this.isInsert) return "";
    },
    label: "User full name."
  },
  avatar: {
    type: String,
    autoValue() {
      if (this.isInsert) return "";
    },
    label: "Profile picture url."
  },
  limit: {
    optional: false,
    type: SimpleSchema.Integer,
    label: "24hr message limit."
  }
});

Profiles.attachSchema(Profiles.schema);

export default Profiles;
