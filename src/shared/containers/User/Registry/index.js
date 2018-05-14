import React from "react";
import styled from "styled-components";
import { users } from "lunes-lib";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "Shared/style-variables";

import { PanelLeft } from "./PanelLeft";
import { PanelRight } from "./PanelRight";
import { Logo } from "Components/Logo";
import { H3 } from "Components/H3";
import { H1 } from "Components/H1";
import { FormBuilder } from "Components/FormBuilder";
import { ButtonSecondary } from "Components/Buttons";
import Slide from "../../../containers/User/Login/Slide";


let CustomLogo = Logo.extend`
  margin: 70px auto 0 auto;
`;
let CustomH3 = H3.extend`
  margin: 25px 0 0 0;
  text-align: center;
  color: white;
  font-size: 1.2em;
`;
let CustomForm = styled.form`
  width: 70%;
  display: block;
  margin: 25px auto 0 auto;
`;
let CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
  text-align: center;
  display: block;
  margin: 10px auto 0 auto;
  ${props => (props.margin ? "margin: " + props.margin + ";" : "")};
`;

let CustomLinkGreen = styled(Link)`
  color: ${style.normalGreen};
  font-size: 1.4em;
  text-decoration: none;
  text-align: center;
  display: block;
  margin: 140px auto 0px auto;
`;
let inputs = [
  { className: "registry-fname", placeholder: "Nome" },
  { className: "registry-lname", placeholder: "Sobrenome" },
  { className: "registry-email", placeholder: "E-mail", type: "email" },
  { className: "registry-pass", placeholder: "Senha", type: "password" },
  { className: "registry-cpass", placeholder: "Confirmar senha", type: "password" },
  { className: "registry-terms", value: " Eu aceito os Termos de Serviços", type: "checkbox" }
];
class Registry extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    let termsEl = document.querySelector(".registry-terms");
    let emailEl = document.querySelector(".registry-email");
    let fnameEl = document.querySelector(".registry-fname");
    let lnameEl = document.querySelector(".registry-lname");
    let passEl = document.querySelector(".registry-pass");
    let cpassEl = document.querySelector(".registry-cpass");
    if (!termsEl.checked) {
      alert("You havent agreed with our terms");
      return null;
    }
    if (passEl.value !== cpassEl.value) {
      alert("Passwords dint match");
      return null;
    }
    if (passEl.value < 8) {
      alert("Password is less than 8 characters");
      return null;
    }
    let fullname = fnameEl.value + " " + lnameEl.value;
    this.props.userCreate({
      email: emailEl.value,
      password: passEl.value,
      fullname: fullname.replace("  ", " ")
    });
  };
  handleStatus() {
    let firstPanelEl = document.querySelector(".js-first-panel-left");
    let secondPanelEl = document.querySelector(".js-second-panel-left");
    let statusEl = document.querySelector(".js-status");

    let { status } = this.props.user;

    if (status === "pending") {
      statusEl.textContent = "Aguarde...";
    } else if (status === "fulfilled") {
      firstPanelEl.style.display = "none";
      secondPanelEl.style.display = "block";
      statusEl.textContent = "Sucesso";
    } else if (status === "rejected") {
      statusEl.textContent = "Tente novamente";
    }
  }
  componentDidUpdate() {
    this.handleStatus();
  }
  render() {
    let { status, logged } = this.props.user;

    return (
      <div>
        <PanelLeft>
          <CustomLogo />

          <CustomH3>Insira os dados necessários para efetuar o seu cadastro</CustomH3>

          <CustomForm onSubmit={this.handleSubmit}>
            <FormBuilder inputs={inputs} />
            <ButtonSecondary type={"submit"}>ENTRAR</ButtonSecondary>
          </CustomForm>

          <H1 className={"js-status"} txCenter clWhite margin={"50px 0 0 0"} />

          <CustomLinkGreen to={"/login"}>Já tem uma conta? Entrar</CustomLinkGreen>

          {/* <CustomLink to={"/login"} margin={"50px 0 0 0"}>Fazer login</CustomLink>
					<CustomLink to={"/reset"} margin={"10px 0 0 0"}>Perdi minha senha</CustomLink> */}
        </PanelLeft>
        <PanelRight>
          <Slide />
        </PanelRight>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userCreate: data => {
      dispatch({
        type: "USER_CREATE",
        payload: users.create({
          email: data.email,
          password: data.password,
          fullname: data.fullname
        })
      });
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registry);
