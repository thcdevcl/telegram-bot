import { RESTDataSource } from "apollo-datasource-rest";

class TelethonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = Meteor.settings.private.services.telethon_api.BASE_URL;
  }

  async checkClient(api_id, api_hash, session_string) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL + `check`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          "session-string": session_string
        }
      }
    );
  }

  async getDialogs(api_id, api_hash, session_string) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL + `get-dialogs`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          "session-string": session_string
        }
      }
    );
  }

  async signinClient(api_id, api_hash, phone, code, uid) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL + `sign-in`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          phone: phone,
          uid: uid,
          code: code
        }
      }
    );
  }

  async getEntity(id, api_id, api_hash, session_string) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL + `get-entity`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          "session-string": session_string,
          "entity-id": id
        }
      }
    );
  }

  async getParticipants(id, api_id, api_hash, session_string) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL +
        `get-participants`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          "session-string": session_string,
          "entity-id": id
        }
      }
    );
  }

  async sendMessage(dispatch) {
    return await this.post(`send-message`, dispatch);
  }
}

export default TelethonAPI;
