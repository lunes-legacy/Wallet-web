import React from "react";
import styled from "styled-components";
import validator from "validator";
import style from "Shared/style-variables";

// LIBS
import { encrypt } from '../../../utils/crypt'

//REDUX
import { connect } from "react-redux";
import { userLogin } from 'Redux/actions';

//COMPONENTS
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Input } from "Components/Input";
import { ButtonSecondary } from "Components/Buttons";
import { CustomLink } from "Components/Link";
import { CustomLinkFooter } from "Components/Link";
import { H1 } from "Components/H1";
import { Logo } from "Components/Logo";
import { P } from "Components/P";


//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";

const WrapPhrases = styled.div`
  width: 100%;
  margin-top: 10%;

  @media (${style.media.tablet2}) {
    margin-top: 12%;
  }

  @media (${style.media.desktop}) {
    margin-top: 25%;
  }
`;

const CustomP = P.extend`
  display: block;
  margin: 50px auto 50px auto;
  text-align: center;

  @media only screen and (min-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 40%;
  }
`;

const CustomLogo = Logo.extend`
  margin: 70px auto 20px auto;
`;

const CustomLinkRight = CustomLink.extend`
  text-align: right;
`;

const Paragraph = styled.div`
  margin-top: 12px;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;
class Login extends React.Component {
  componentDidUpdate() {
    this.handleStatus();
  }

  componentDidMount() {
    let walletInfo = localStorage.getItem('WALLET-INFO');
    let accessToken = localStorage.getItem('ACCESS-TOKEN');
    if (walletInfo && accessToken) {
      this.props.history.push('/app/home')
    }
  }

  getSeed() {
    let walletInfo = localStorage.getItem('WALLET-INFO');
    let emailEl = document.querySelector(".login-email");
    localStorage.setItem('ACCESS-TOKEN', encrypt(JSON.stringify({ email: emailEl.value, accessToken: this.props.user.data.accessToken })));
    walletInfo ? ( this.props.history.push('/app/home') ) : ( this.props.history.push('/import') )
  }

  handleLogin = event => {
    event.preventDefault();

    let emailEl = document.querySelector(".login-email");
    let passEl = document.querySelector(".login-password");

    let email = emailEl.value;
    let password = passEl.value;

    this.props.userLogin({
      email,
      password
    });

    let errors = [];
    if (!validator.isEmail(emailEl.value)) {
      errors.push('Um email válido deve ser informado');
    }
    if (validator.isEmpty(passEl.value)) {
      errors.push('Campo de senha vazio');
    }
    if (errors.length > 0) {
      alert('- ' + errors.join('\n- '));
      return;
    }
  };

  handleStatus() {
    try {
      let statusEl = document.querySelector(".js-status");
      let { status } = this.props.user;
      if (status === "pending") {
        statusEl.textContent = "Loading...";
      } else if (status === "fulfilled") {
        this.getSeed();
      }
      else if (status === "rejected") {
        statusEl.textContent = "Tente novamente";
      }
    }
    catch (err) {
      console.warn("There's an error on handleStatus", 500, 'HANDLE_STATUS_ERROR', err);
    }
  }

  render() {
    let { status, logged } = this.props.user;
    return (
      <div>
        <PanelLeft>
          <CustomLogo />

          <WrapPhrases>
            <H1 clNormalGreen txCenter margin-top={"10%"}>
              Rápida, segura e inteligente!
            </H1>
            <Paragraph clWhite txCenter margin={"20px 0 70px 0"} fontSize={"1.4rem"}>
              Entre com seus dados
            </Paragraph>
          </WrapPhrases>

          <Form margin={"10% auto"} width={"80%"}>
            <FormGroup>
              <Input placeholder={"nome@email.com"} className={"login-email"} placeholder={"E-mail"} type={"email"} required />
            </FormGroup>
            <FormGroup>
              <Input placeholder={"Senha"} className={"login-password"} placeholder={"Senha"} type={"password"} required />
            </FormGroup>

            <CustomLinkRight to={"/reset"} margin={"0 auto 20px auto"}>
              Esqueceu a senha?
            </CustomLinkRight>

            <ButtonSecondary secondary onClick={this.handleLogin}>
              {logged ? "Logado" : "Fazer login"}
            </ButtonSecondary>
          </Form>

          <P txCenter clWhite margin={"20px 0 0 0"} fontSize={"1.4rem"} className={"js-status"} />

          <CustomP clWhite fontSize={"1.4rem"}>
            Não tem uma conta?{" "}
            <CustomLinkFooter to={"/registry"} color={`${style.normalGreen}`} >
              Inscrever-se.
            </CustomLinkFooter>
          </CustomP>


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
    user: state.user,
    walletInfo: state.walletInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => {
      dispatch(userLogin(email, password));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
