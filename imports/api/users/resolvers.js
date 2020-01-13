export default {
  User: {
    profile: (obj, args, { user }) => user.profile,
    groups: async (obj, args, { user, dataSources }) => {
      const { api_hash, api_id, session_string } = user.profile.app;
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
      // returns group with participant ids
      return groups;
    }
  },
  Query: {
    currentUser: (obj, arg, { user }) => user,
    checkClient: async (obj, args, { dataSources, user }) => {
      const { api_id, api_hash, phone, session_string } = user.profile.app;
      if (session_string) {
        const res = await dataSources.TelethonAPI.checkClient(
          api_id,
          api_hash,
          session_string,
          user._id
        );
        const { authorized, connected } = res.data;
        Meteor.users.update(
          { _id: user._id },
          {
            $set: {
              "profile.app": {
                api_id,
                api_hash,
                phone,
                session_string: res.data.session_string
              }
            }
          }
        );
        return {
          authorized,
          connected,
          session_string: res.data.session_string
        };
      }
      return { connected: false, authorized: false };
    }
  },
  Mutation: {
    enqueueMessage: async (obj, { dispatch }, { dataSources, user }) =>
      Meteor.call("messages.enqueue", { ...dispatch, from: user._id }),
    setProfileApp: async (obj, { app }, { user, dataSources }) => {
      const { api_id, api_hash, phone } = app;
      const res = await dataSources.TelethonAPI.signinClient(
        api_id,
        api_hash,
        phone,
        "",
        user._id
      );
      const { session_string } = res.data;
      return Meteor.users.update(
        { _id: user._id },
        {
          $set: {
            "profile.app": { ...app, session_string }
          }
        }
      );
    },
    validateCode: async (obj, { code }, { dataSources, user }) => {
      const { phone, api_id, api_hash } = user.profile.app;
      const res = await dataSources.TelethonAPI.signinClient(
        api_id,
        api_hash,
        phone,
        code,
        user._id
      );
      return { connected: true };
    }
  }
};
