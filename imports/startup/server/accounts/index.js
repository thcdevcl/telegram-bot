import { Accounts } from "meteor/accounts-base";

Accounts.onCreateUser((options, user) => {
  let profile = Object.assign({}, options.profile);
  profile.app = {
    api_id: "",
    api_hash: "",
    phone: "",
    session_string: ""
  };
  user.profile = profile;
  return user;
});
