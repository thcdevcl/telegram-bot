import { RESTDataSource } from "apollo-datasource-rest";

class TelethonAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = Meteor.settings.private.services.telethon_api.BASE_URL;
  }

  async connectClient() {
    return await this.get("connect");
  }

  async checkClient() {
    return await this.get("check");
  }

  async getDialogs() {
    return await this.get("get-dialogs");
  }

  async sendCode() {
    return await this.get("send-code");
  }

  async signinClient(code) {
    return await this.get(`sign-in/${code}`);
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
}

export default TelethonAPI;
