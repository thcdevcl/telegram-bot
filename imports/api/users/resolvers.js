export default {
  Client: {
    groups: async (obj, args, { dataSources }) =>
      await dataSources.TelethonAPI.getDialogs(),
    groupCount: async (obj, args, { dataSources }) => {
      const res = await dataSources.TelethonAPI.getDialogs();
      return res.length;
    }
  },
  Query: {
    currentUser: (obj, arg, { user }) => user,
    checkClient: async (obj, args, { dataSources }) =>
      await dataSources.TelethonAPI.checkClient()
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
    }
  }
};
