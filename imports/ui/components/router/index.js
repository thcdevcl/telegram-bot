import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "../../pages/IndexPage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={Meteor.settings.public.router.index.PATH}
          component={Index}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
