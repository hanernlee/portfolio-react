import React from "react";
import { Route, Redirect } from "react-router-dom";
import MatchPropTypes from "./MatchPropTypes";

/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const PublicRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user
        ? <Redirect to={{ pathname: "/" }} />
        : <Component user={user} {...props} />}
  />
);

PublicRoute.propTypes = MatchPropTypes;

export default PublicRoute;