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
    group: async (obj, { id }, { dataSources, user }) => {
      const { api_id, api_hash, session_string } = user.profile.app;
      const customGroup = Groups.findOne({ _id: id });
      if (!customGroup) {
        const res = await dataSources.TelethonAPI.getEntity(
          id,
          api_id,
          api_hash,
          session_string
        );
        console.log(res);
      }
      return customGroup
        ? customGroup
        : await dataSources.TelethonAPI.getEntity(
            id,
            api_id,
            api_hash,
            session_string
          );
    }
  },
  Mutation: {
    createGroup: (obj, { group }, { user }) => {
      const _id = Groups.insert({
        title: group.title,
        owner: user._id,
        participantids: []
      });
      return Groups.findOne({ _id });
    },
    addMember: (obj, { id, target }, { user }) => {
      Groups.update({ _id: target }, { $addToSet: { participantids: id } });
      return Groups.findOne({ _id: target });
    }
  }
};
