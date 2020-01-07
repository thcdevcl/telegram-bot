import { RESTDataSource } from "apollo-datasource-rest";

class TelethonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = Meteor.settings.private.services.telethon_api.BASE_URL;
  }

  async connectClient() {
    return await this.get("connect");
  }

  async checkClient(api_id, api_hash, session_string, uid) {
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

  async getDialogs(api_id, api_hash, session_string, uid) {
    return await this.get("get-dialogs", {
      api_id,
      api_hash,
      session_string,
      uid: "",
      code: "",
      phone: ""
    });
  }

  async sendCode() {
    return await this.get("send-code");
  }

  async signinClient(api_id, api_hash, phone, uid) {
    return await HTTP.get(
      Meteor.settings.private.services.telethon_api.BASE_URL + `sign-in`,
      {
        headers: {
          "api-id": api_id,
          "api-hash": api_hash,
          phone: phone,
          uid: uid
        }
      }
    );
  }

  async getEntity(id) {
    return await this.get(`get-entity/${id}`);
  }

  async getParticipants(id) {
    return await this.get(`get-participants/${id}`);
  }

  async sendMessage(dispatch) {
    return await this.post(`send-message`, dispatch);
  }

  async verifyCode(code, phone, uid, api_hash, api_id) {
    return await this.get(`verify-code`, {
      code,
      phone,
      uid,
      api_hash: "",
      api_id: "",
      session_string: ""
    });
  }
}

export default TelethonAPI;
