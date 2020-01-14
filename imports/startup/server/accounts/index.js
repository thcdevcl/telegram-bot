import { Accounts } from "meteor/accounts-base";
import Profiles from "../../../api/profiles/Profiles";

Accounts.onCreateUser((options, user) => {
  const { role } = options.profile;
  Profiles.insert({
    owner: user._id,
    role: role ? role : "user",
    limit: 100
  });
  return user;
});
