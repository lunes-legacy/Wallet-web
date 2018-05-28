import React from "react";
import { users } from "lunes-lib";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import UserClass from "Classes/User";

//COMPONENTS
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Input } from "Components/Input";
import { ButtonSecondary } from "Components/Buttons";
import { Link, CustomLink } from "Components/Link";
import { H1 } from "Components/H1";
import { H2 } from "Components/H2";
import { H3 } from "Components/H3";
import { P } from "Components/P";
import { Logo } from "Components/Logo";

//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";
import FooterUser from 'Components/FooterUser'

const WrapPhrases = styled.div`
  width: 100%;
  margin-top: 160px;
`;

const CustomLogo = Logo.extend`
  margin: 70px auto 20px auto;
`;

const CustomLinkRight = CustomLink.extend`
  text-align: right;

`;

class Login extends React.Component {
  componentDidUpdate() {
    this.handleStatus();
  }
  handleLogin = event => {
    event.preventDefault();
    let emailEl = document.querySelector(".login-email");
    let passEl  = document.querySelector(".login-password");

    let email    = emailEl.value;
    let password = passEl.value;
    this.props.userLogin(email, password);
  };
  handleStatus() {
    let statusEl = document.querySelector(".js-status");

    let { status } = this.props.user;

    if (status === "pending") {
      statusEl.textContent = "Aguarde...";
    } else if (status === "fulfilled") {
      statusEl.textContent = "Sucesso";
    } else if (status === "rejected") {
      statusEl.textContent = "Tente novamente";
    }
  }
  render() {
    let { status, logged } = this.props.user;
    return (
      <div>
        <PanelLeft>
          <CustomLogo />

          <WrapPhrases>
            <H1 clNormalGreen txCenter>
              Rápida, segura e inteligente!
            </H1>
            <P clWhite txCenter margin={"20px 0 70px 0"} fontSize={"1.4rem"}>
              Entre com seus dados
            </P>
          </WrapPhrases>

          <Form margin={"80px auto"} width={"80%"}>
            <FormGroup>
              <Input placeholder={"nome@email.com"} className={"login-email"} />
            </FormGroup>
            <FormGroup>
              <Input type="password" placeholder={"Senha"} className={"login-password"} />
            </FormGroup>

            <CustomLinkRight to={"/reset"} margin={"0 auto 20px auto"}>
              Esqueceu a senha?
            </CustomLinkRight>

            <ButtonSecondary secondary onClick={this.handleLogin}>
              {logged ? "Logado" : "Fazer login"}
            </ButtonSecondary>
          </Form>

          <H1 txCenter clWhite className={"js-status"} />

          <FooterUser content="Não tem uma conta?" to="/registry" label="Inscrever-se" />

        </PanelLeft>

        <PanelRight>
          <Slide />
        </PanelRight>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => {
      let login = new UserClass().login;
      dispatch({
        type: "USER_LOGIN",
        payload: login({ email, password })
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
