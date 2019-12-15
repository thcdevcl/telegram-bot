import Groups from "../groups/Groups";

export default {
  User: {
    profile: (obj, args, { user }) => user.profile
  },
  Client: {
    groups: async (obj, args, { dataSources, user }) => {
      const groups = await dataSources.TelethonAPI.getDialogs();
      const customGroups = Groups.find({ owner: user._id }).fetch();
      return groups.concat(customGroups);
    },
    groupCount: async (obj, args, { dataSources }) => {
      const res = await dataSources.TelethonAPI.getDialogs();
      return res.length;
    }
  },
  Query: {
    currentUser: (obj, arg, { user }) => user,
    checkClient: async (obj, args, { dataSources }) =>
      await dataSources.TelethonAPI.checkClient(),
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
    validateCode: async (obj, { code }, { dataSources }) => {
      const res = await dataSources.TelethonAPI.signinClient(code);
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
    }
  }
};
