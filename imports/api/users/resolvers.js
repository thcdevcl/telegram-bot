import Messages from "../messages/Messages";
import Queue from "../dispatch-queue/Queue";
import Profiles from "../profiles/Profiles";
import TelegramAccounts from "../telegram-accounts/TelegramAccounts";

export default {
  User: {
    accounts: ({ _id }, args, ctx) =>
      TelegramAccounts.find({ owner: _id }).fetch(),
    profile: ({ _id }, args, ctx) => Profiles.findOne({ owner: _id })
  },
  TelegramAccount: {
    groups: async (
      { api_id, api_hash, session_string },
      args,
      { user, dataSources }
    ) => {
      const { data } = await dataSources.TelethonAPI.getDialogs(
        api_id,
        api_hash,
        session_string
      );
      let groups = [];
      // filter restricted/invalid channels, groups and megagroups
      for (let index in data) {
        try {
          const res = await dataSources.TelethonAPI.getParticipants(
            data[index].id,
            api_id,
            api_hash,
            session_string
          );
          if (res.statusCode == 200)
            groups.push({
              ...data[index],
              participantids: res.data.map(({ id }) => id)
            });
        } catch (e) {}
      }
      return groups;
    },
    telethon: async (
      { api_id, api_hash, session_string },
      args,
      { user, dataSources }
    ) => {
      if (session_string) {
        const res = await dataSources.TelethonAPI.checkClient(
          api_id,
          api_hash,
          session_string,
          user._id
        );
        const { authorized, connected } = res.data;
        return {
          authorized,
          connected
        };
      }
      return { authorized: false, connected: false };
    },
    messages: ({ _id }, args, ctx) =>
      Messages.find({ accountid: _id }, { sort: { createdAt: -1 } }).fetch()
  },
  Message: {
    queue: ({ _id }, args, ctx) => Queue.find({ messageid: _id }).fetch(),
    sent: ({ _id }, args, ctx) => {
      const queue = Queue.find({ messageid: _id }).fetch();
      const sent = queue.filter(({ sent }) => sent);
      return queue.length == sent.length;
    }
  },
  Profile: {
    role: (obj, args, { user }) =>
      Meteor.roleAssignment
        .find({ "user._id": user._id })
        .fetch()
        .pop().role._id
  },
  Query: {
    currentUser: (obj, arg, { user }) => user,
    account: (obj, { _id }, { user }) => TelegramAccounts.findOne({ _id })
  },
  Mutation: {
    enqueueMessage: async (obj, { dispatch }, { dataSources, user }) =>
      Meteor.call("messages.enqueue", { ...dispatch, from: user._id }),
    createTelegramAccount: async (obj, { account }, { user, dataSources }) => {
      const res = await dataSources.TelethonAPI.signinClient(
        account.api_id,
        account.api_hash,
        account.phone,
        user._id
      );
      const _id = TelegramAccounts.insert({
        ...account,
        owner: user._id,
        session_string: res.data.session_string
      });
      return user;
    },
    validateCode: async (obj, { account }, { dataSources, user }) => {
      const res = await dataSources.TelethonAPI.signinClient(
        account.api_id,
        account.api_hash,
        account.phone,
        user._id,
        account.code
      );
      return user;
    }
  }
};
