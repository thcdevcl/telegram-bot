import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const TelegramAccounts = new Mongo.Collection("telegram_accounts");

TelegramAccounts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

TelegramAccounts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

TelegramAccounts.schema = new SimpleSchema({
  owner: {
    type: String,
    optional: false,
    label: "The _id of user who created this document."
  },
  name: {
    type: String,
    optional: false,
    label: "Account name."
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
  api_id: {
    type: String,
    optional: false,
    label: "Telegram api id."
  },
  api_hash: {
    type: String,
    optional: false,
    label: "Telegram api hash."
  },
  phone: {
    type: String,
    optional: false,
    label: "Phone number"
  },
  session_string: {
    type: String,
    optional: false,
    label: "Session string"
  }
});

TelegramAccounts.attachSchema(TelegramAccounts.schema);

export default TelegramAccounts;
