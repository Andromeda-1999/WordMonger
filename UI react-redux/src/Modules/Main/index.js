import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./styles.css";

// Routes
import StoriesRoutes from "./Stories/routes";


export default function MainRoutes({ match }) {
  return (
    <>
      <nav className="navbar">
        <h1>Wattpad</h1>
        <div className="links">
          <Link to="/app/stories">My Stories</Link>
          <Link to="/app/stories/add">New Story</Link>
          <Link to="/home">Logout</Link>
        </div>
      </nav>

      <Switch>
        <Route path={`${match.url}/stories`} component={StoriesRoutes} />
      </Switch>
    </>
  );
}
