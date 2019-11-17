import { RESTDataSource } from "apollo-datasource-rest";

class TelegramBotAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = Meteor.settings.private.services.telegram_bot_api.BASE_URL;
  }
}

export default TelegramBotAPI;
