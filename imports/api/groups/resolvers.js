import Groups from "./Groups";

export default {
  Group: {
    id: ({ _id, id }, args, ctx) => (id ? id : _id),
    participants: async (
      { _id, id, participantids },
      args,
      { dataSources }
    ) => {
      return _id
        ? participantids.map(
            async id => await dataSources.TelethonAPI.getEntity(id)
          )
        : await dataSources.TelethonAPI.getParticipants(id);
    }
  },
  Query: {
    group: async (obj, { id }, { dataSources }) =>
      await dataSources.TelethonAPI.getEntity(id)
  },
  Mutation: {
    createGroup: (obj, { group }, { user }) =>
      Groups.insert({ name: group.name, owner: user._id, participantids: [] })
  }
};
