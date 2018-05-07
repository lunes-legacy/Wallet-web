import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "Containers/App/index";
import Login from "Containers/User/Login/index";
import Registry from "Containers/User/Registry/index";
import Reset from "Containers/User/Reset/index";

class AppSwitcher extends React.Component {
  render() {
    return (
      <Switch>
        <Route strict path={"/app"} component={App} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/registry"} component={Registry} />
        <Route exact path={"/reset"} component={Reset} />
      </Switch>
    );
  }
}

export default AppSwitcher;
