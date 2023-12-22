import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import List from "./list";
import Create from "./create";
import Details from "./details";

const StoriesRoutes = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/add`} component={Create} />
      <Route exact path={`${match.url}/edit/:id`} component={Create} />
      <Route exact path={`${match.url}/view/:id`} component={Details} />

      <Route path={"/"} component={List} />
    </Switch>
  );
};

export default StoriesRoutes;
