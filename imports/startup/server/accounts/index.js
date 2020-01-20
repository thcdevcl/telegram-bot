import { Accounts } from "meteor/accounts-base";
import Profiles from "../../../api/profiles/Profiles";

Accounts.onCreateUser((options, user) => {
  const { role } = options.profile;
  Profiles.insert({
    owner: user._id,
    limit: 100
  });
  Roles.addUsersToRoles(user._id, role ? role : "user");
  return user;
});
