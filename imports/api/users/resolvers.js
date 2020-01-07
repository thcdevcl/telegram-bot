import Groups from "../groups/Groups";

export default {
  User: {
    profile: (obj, args, { user }) => user.profile
  },
  Client: {
    groups: async (obj, args, { dataSources, user }) => {
      const { api_hash, api_id, session_string } = user.profile.app;
      const groups = await dataSources.TelethonAPI.getDialogs(
        api_hash,
        api_id,
        session_string,
        user._id
      );
      const customGroups = Groups.find({ owner: user._id }).fetch();
      return groups.concat(customGroups);
    },
    groupCount: async (obj, args, { user, dataSources }) => {
      const res = await dataSources.TelethonAPI.getDialogs();
      return {
        telegram: res.length,
        custom: Groups.find({ owner: user._id }).fetch().length
      };
    }
  },
  Query: {
    currentUser: (obj, arg, { user }) => user,
    checkClient: async (obj, args, { dataSources, user }) => {
      const { api_id, api_hash, session_string } = user.profile.app;
      return session_string
        ? await dataSources.TelethonAPI.checkClient(
            api_id,
            api_hash,
            session_string,
            user._id
          )
        : { connected: false, authorized: false };
    },
    customGroups: (obj, args, { user }) =>
      Groups.find({ owner: user._id }).fetch()
  },
  Mutation: {
    connectClient: async (obj, args, { dataSources }) =>
      await dataSources.TelethonAPI.connectClient(),
    sendCode: async (obj, args, { dataSources }) => {
      await dataSources.TelethonAPI.sendCode();
      return { connected: true };
    },
    validateCode: async (obj, { code }, { dataSources, user }) => {
      const { phone } = user.profile.app;
      const res = await dataSources.TelethonAPI.verifyCode(
        code,
        phone,
        user._id
      );
      return { connected: true };
    },
    sendBulkMessage: async (obj, { bulk }, { dataSources }) => {
      const { ids, message } = bulk;
      ids.forEach(
        async id =>
          await dataSources.TelethonAPI.sendMessage({
            to: parseInt(id),
            message
          })
      );
      return { sent: true };
    },
    setProfileApp: async (obj, { app }, { user, dataSources }) => {
      const { api_id, api_hash, phone } = app;
      const res = await dataSources.TelethonAPI.signinClient(
        api_id,
        api_hash,
        phone,
        user._id
      );
      console.log(res);
      return Meteor.users.update(
        { _id: user._id },
        {
          $set: {
            "profile.app": { ...app, session_string: res.session_string }
          }
        }
      );
    }
  }
};
