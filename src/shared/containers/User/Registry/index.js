import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import style from "Shared/style-variables";
//REDUX
import { userCreate } from 'Redux/actions';
//PRIVATE COMPONENTS
import { PanelLeft } from "./PanelLeft";
import { PanelRight } from "./PanelRight";
import { Logo } from "Components/Logo";
import { CircleLink } from "Components/Link";
import { Img } from "Components/Img";
import { H3 } from "Components/H3";
import { H1 } from "Components/H1";
import { FormBuilder } from "Components/FormBuilder";
import { ButtonSecondary } from "Components/Buttons";
import Slide from "../../../containers/User/Login/Slide";
import FooterUser from 'Components/FooterUser'

let CustomLogo = Logo.extend`
  margin: 70px auto 0 auto;
`;

let CustomH1 = H1.extend`
  font-weight: 500;
  margin: 2.5rem 5rem 0 5rem;
  line-height: 25px;
`;

let CustomH3 = H3.extend`
  margin: 2rem;
  text-align: center;
  color: white;
  font-size: 1.2em;
`;

let CustomForm = styled.form`
  width: 70%;
  display: block;
  margin: 25px auto 0 auto;
`;

let SuccessMessage = styled.div`
  display: none;
`;

let ArrowImg = Img.extend`
  border-style: none;
  padding-top: 14px;
`;

let inputs = [
  { className: "registry-fname", placeholder: "Nome" },
  { className: "registry-lname", placeholder: "Sobrenome" },
  { className: "registry-email", placeholder: "E-mail", type: "email" },
  { className: "registry-pass", placeholder: "Senha", type: "password" },
  { className: "registry-cpass", placeholder: "Confirmar senha", type: "password" },
  { className: "registry-terms", value: <span> Eu aceito os <Anchor href ="/" target ="blank_">Termos de Serviços</Anchor> </span>  , type: "checkbox" }
];

class Registry extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const termsEl = document.querySelector(".registry-terms");
    const emailEl = document.querySelector(".registry-email");
    const firstNameEl = document.querySelector(".registry-fname");
    const lastNameEl = document.querySelector(".registry-lname");
    const passEl = document.querySelector(".registry-pass");
    const confirmPassEl = document.querySelector(".registry-cpass");

    let errors = [];

    if (!validator.isLength(firstNameEl.value, {min: 3, max: undefined})) {
      errors.push('O nome deve ter no mínimo 3 caracteres');
    }

    if (!validator.isLength(lastNameEl.value, {min: 3, max: undefined})) {
      errors.push('O sobrenome deve ter no mínimo 3 caracteres');
    }

    if (!validator.isEmail(emailEl.value) || validator.isEmpty(emailEl.value)) {
      errors.push('Um email válido deve ser informado');
    }

    const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_+=@#-$%^&*])(?=.{8,})/g;
    if (!validator.matches(passEl.value, passRules)) {
      errors.push('A senha deve ter mais que 8 caracteres entre letras maíusuculas e minúsculas, \n\tnúmeros e pelo menos um caracter especial');
    }

    if (passEl.value !== confirmPassEl.value) {
      errors.push('A confirmação de senha não confere');
    }

    if (!termsEl.checked) {
      errors.push('Você deve aceitar os termos para continuar');
    }

    if (errors.length > 0) {
      alert('- ' + errors.join('\n- '));
      return;
    }

    let fullname = `${firstNameEl.value} ${lastNameEl.value}`;

    alert('SUCESSO!')
    // this.props.userCreate({
    //   email: emailEl.value,
    //   password: passEl.value,
    //   fullname: fullname.replace("  ", " ")
    // });
  };

  handleStatus() {
    try {
      let firstPanelEl  = document.querySelector(".js-first-panel-left");
      let secondPanelEl = document.querySelector(".js-second-panel-left");
      let statusEl      = document.querySelector(".js-status");

      let { status } = this.props.user;

      if (status === "pending") {
        statusEl.textContent = "Aguarde...";
      } else if (status === "fulfilled") {
        firstPanelEl.style.display  = "none";
        secondPanelEl.style.display = "block";
        // statusEl.textContent = "Sucesso";
      } else if (status === "rejected") {
        statusEl.textContent = "Tente novamente";
      }
    } catch(err) {
      console.warn("There's an error on handleStatus", 500, 'HANDLE_STATUS_ERROR', err);
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.handleStatus();
    },300);
  }

  render() {
    let { status, logged } = this.props.user;

    return (
      <div>
        <PanelLeft>
          <CustomLogo />

          <CustomForm onSubmit={this.handleSubmit} className={"js-first-panel-left"}>
            <CustomH3>Insira os dados necessários para efetuar o seu cadastro</CustomH3>
            <FormBuilder inputs={inputs} />
            <ButtonSecondary type={"submit"}>Registrar</ButtonSecondary>
          </CustomForm>

          <SuccessMessage className={"js-second-panel-left"}>
            <Img src={"img/user_panel_left/ic_email.svg"} margin={"10.5rem auto 0 auto"} width={"80px"} />
            <CustomH1 txCenter clWhite>
              Uma mensagem com link de ativação foi enviada para o seu endereço de e-mail.
            </CustomH1>
            <CircleLink to={"/login"} margin={"50px auto 10px auto"}>
              <ArrowImg src={"img/user_panel_left/right-arrow.svg"} margin={"auto"} width={"20px"} />
            </CircleLink>
          </SuccessMessage>

          <H1 className={"js-status"} txCenter clWhite margin={"50px 0 0 0"} />

          <FooterUser content="Já tem uma conta?" to="/login" label="Entrar" />

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
      dispatch(userCreate(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registry);
