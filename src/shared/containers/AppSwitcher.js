import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import style from "Shared/style-variables";

import App from "Containers/App/index";
import Login from "Containers/User/Login/index";
import Import from "Containers/User/Import/index";
import Registry from "Containers/User/Registry/index";
import Reset from "Containers/User/Reset/index";



const Divmobile = styled.div`
widht 100%;
height 100%; 
background-color: #4B2C82; 
`;

const Paragraphmobile = styled.div`
   
   font-size: 2.2rem;
   text-align: center; 
   font-family: offSide; 
   color: #4CD566;
   position:absolute;
   margin-top: 50%; 
   font-weight: bold; 
   margin-left: 5%;
   margin-right: 5%;
   
   
`;
class AppSwitcher extends React.Component {


  render() {
    // 791 = iPad
    if (window.innerWidth < 761) {
      return (
        <Divmobile>

          <Paragraphmobile offSide>
          Aviso!  Visando uma melhor experiência de uso, recomendamos que acesse a Lunes Wallet por computadores ou tablets.  Pedimos que aguardem, numa próxima atualização, a compatibilidade total com dispositivos móveis.  Obrigado!
          </Paragraphmobile>

        </Divmobile>
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
