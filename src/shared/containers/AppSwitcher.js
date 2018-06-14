import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import style from "Shared/style-variables";

import App from "Containers/App/index";
import Login from "Containers/User/Login/index";
import Import from "Containers/User/Import/index";
import Registry from "Containers/User/Registry/index";
import Reset from "Containers/User/Reset/index";





const Paragraphmobile = styled.div`
   
   font-size: 5.0rem;
   color: white; 
   text-align: center; 
   
`;
class AppSwitcher extends React.Component {


  render() {
    // 791 = iPad
    if (window.innerWidth < 761) {
      return (
        <div>
          <Paragraphmobile> Versão mobile disponível em breve ! </Paragraphmobile>
        </div>
      )
    }

    return (
      <Switch>
        <Route strict path={"/app"} component={App} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/"} component={Login} />
        <Route exact path={"/import"} component={Import} />
        <Route exact path={"/registry"} component={Registry} />
        <Route exact path={"/reset"} component={Reset} />
      </Switch>
    );
  }
}

export default AppSwitcher;
