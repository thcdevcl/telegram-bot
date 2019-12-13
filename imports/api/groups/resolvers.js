import Groups from "./Groups";

export default {
  Group: {
    id: ({ _id, id }, args, ctx) => (_id ? _id : id),
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
    createGroup: (obj, { group }, { user }) => {
      const _id = Groups.insert({
        title: group.title,
        owner: user._id,
        participantids: []
      });
      return Groups.findOne({ _id });
    }
  }
};
