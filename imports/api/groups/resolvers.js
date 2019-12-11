export default {
  Group: {
    participants: async ({ id }, args, { dataSources }) =>
      await dataSources.TelethonAPI.getParticipants(id)
  },
  Query: {
    group: async (obj, { id }, { dataSources }) =>
      await dataSources.TelethonAPI.getEntity(id)
  }
};
