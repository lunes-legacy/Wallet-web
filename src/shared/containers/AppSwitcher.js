import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import style from "Shared/style-variables";
import { Redirect } from 'react-router-dom';

import App from "Containers/App/index";
import Login from "Containers/User/Login/index";
import Import from "Containers/User/Import/index";
import Registry from "Containers/User/Registry/index";
import Reset from "Containers/User/Reset/index";
import { ErrorBoundary } from 'Components';



let DivStyled = styled.div`
  widht: 100vw;
  height: 100vh; 
  background: #4B2C82;
   
`;


let Paragraphmobile = styled.div`
    
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
        <DivStyled>

          <Paragraphmobile offSide>
            Notice! For a better use experience, we recommend that you visit Lunes Wallet for computers or tablets. We're asking you to wait, in an upcoming update, for full mobile device compatibility. Thank you!
          </Paragraphmobile>

        </DivStyled>
      )
    }

    return (
      <ErrorBoundary entirePageError>
        <Switch>
          <Route strict path={"/app"} component={App} />
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/import"} component={Import} />
          <Route exact path={"/registry"} component={Registry} />
          <Route exact path={"/reset"} component={Reset} />
          <Route render={() => {
            return <Redirect to="/login"/>;
          }}/>
        </Switch>
      </ErrorBoundary>
    );
  }
}


export default AppSwitcher;
