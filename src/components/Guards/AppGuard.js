import React from "react";
import {Redirect} from "react-router-dom";

/**
 * React’s route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route.
 * React's guards are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated {props.children} are rendered --> The content inside the <AppGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @param isAuth
 * @Guard
 */
export const AppGuard = props => {
  if (props.isAuth) {
    return props.children;
  }
  return <Redirect to={"/login"} />;
};
