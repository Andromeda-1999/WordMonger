import { Route, Switch, Router } from "react-router-dom";
import history from "./history";

// Routes
import Home from "./Modules/Home";
import MainRoutes from "./Modules/Main";

function ReactRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/app" component={MainRoutes} />
      </Switch>
    </Router>
  );
}
export default ReactRouter;
